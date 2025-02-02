import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { date } = await req.json();
    console.log('Processing workout for date:', date);

    // Fetch workout and its sections
    const { data: workout, error: workoutError } = await supabase
      .from('workouts')
      .select('*, workout_sections(*)')
      .eq('date', date)
      .single();

    if (workoutError) {
      console.error('Error fetching workout:', workoutError);
      throw workoutError;
    }

    if (!workout) {
      console.error('No workout found for date:', date);
      throw new Error('No workout found for this date');
    }

    console.log('Found workout:', workout);

    // Check if we need to generate warmup or recovery
    const sections = workout.workout_sections || [];
    const hasWarmup = sections.some(s => s.section_type === 'warmup');
    const hasRecovery = sections.some(s => s.section_type === 'recovery');

    if (!hasWarmup || !hasRecovery) {
      console.log('Generating missing sections with OpenAI');
      
      const wodSection = sections.find(s => s.section_type === 'wod');
      const strengthSection = sections.find(s => s.section_type === 'strength');

      const prompt = `
        Como un experto entrenador de CrossFit, necesito que generes un 
        ${!hasWarmup ? 'calentamiento específico y' : ''} 
        ${!hasRecovery ? 'rutina de recuperación' : ''} 
        para el siguiente entrenamiento:
        
        ${strengthSection ? `Strength: ${JSON.stringify(strengthSection.content)}\n` : ''}
        WOD: ${JSON.stringify(wodSection?.content)}
        
        ${!hasWarmup ? 'Para el calentamiento, incluye 4-5 ejercicios con sus repeticiones o duración.' : ''}
        ${!hasRecovery ? 'Para la recuperación, sugiere estiramientos específicos y su duración.' : ''}
        
        Responde en formato JSON con esta estructura:
        {
          ${!hasWarmup ? '"warmup": [{"name": "ejercicio", "reps": "repeticiones"}],' : ''}
          ${!hasRecovery ? '"recovery": "descripción detallada"' : ''}
        }
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'Eres un experto entrenador de CrossFit que genera calentamientos y rutinas de recuperación específicas.' 
            },
            { role: 'user', content: prompt }
          ],
        }),
      });

      if (!response.ok) {
        console.error('OpenAI API error:', await response.text());
        throw new Error('Failed to generate workout sections with OpenAI');
      }

      const aiResponse = await response.json();
      const suggestions = JSON.parse(aiResponse.choices[0].message.content);

      // Insert new sections
      if (!hasWarmup && suggestions.warmup) {
        const { error: warmupError } = await supabase
          .from('workout_sections')
          .insert({
            workout_id: workout.id,
            section_type: 'warmup',
            content: { exercises: suggestions.warmup }
          });

        if (warmupError) throw warmupError;
      }

      if (!hasRecovery && suggestions.recovery) {
        const { error: recoveryError } = await supabase
          .from('workout_sections')
          .insert({
            workout_id: workout.id,
            section_type: 'recovery',
            content: suggestions.recovery
          });

        if (recoveryError) throw recoveryError;
      }

      // Fetch updated workout
      const { data: updatedWorkout, error: updateError } = await supabase
        .from('workouts')
        .select('*, workout_sections(*)')
        .eq('date', date)
        .single();

      if (updateError) throw updateError;
      
      console.log('Successfully updated workout with AI-generated sections');
      return new Response(JSON.stringify(updatedWorkout), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(workout), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-workout function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});