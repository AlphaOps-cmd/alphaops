import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl!, supabaseKey!);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();

    // Fetch workout from database
    const { data: workout, error: workoutError } = await supabase
      .from('workouts')
      .select(`
        *,
        workout_sections (*)
      `)
      .eq('date', date)
      .single();

    if (workoutError) throw workoutError;

    // If no warmup or recovery exists, generate them with OpenAI
    const sections = workout.workout_sections || [];
    const hasWarmup = sections.some(s => s.section_type === 'warmup');
    const hasRecovery = sections.some(s => s.section_type === 'recovery');

    if (!hasWarmup || !hasRecovery) {
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
            { role: 'system', content: 'Eres un experto entrenador de CrossFit que genera calentamientos y rutinas de recuperación específicas.' },
            { role: 'user', content: prompt }
          ],
        }),
      });

      const aiResponse = await response.json();
      const suggestions = JSON.parse(aiResponse.choices[0].message.content);

      // Insert new sections
      if (!hasWarmup && suggestions.warmup) {
        await supabase
          .from('workout_sections')
          .insert({
            workout_id: workout.id,
            section_type: 'warmup',
            content: { exercises: suggestions.warmup }
          });
      }

      if (!hasRecovery && suggestions.recovery) {
        await supabase
          .from('workout_sections')
          .insert({
            workout_id: workout.id,
            section_type: 'recovery',
            content: suggestions.recovery
          });
      }

      // Fetch updated workout
      const { data: updatedWorkout, error: updateError } = await supabase
        .from('workouts')
        .select(`
          *,
          workout_sections (*)
        `)
        .eq('date', date)
        .single();

      if (updateError) throw updateError;
      workout = updatedWorkout;
    }

    return new Response(JSON.stringify(workout), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});