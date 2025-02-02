import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating AI recommendations');

    // Get user's recent workouts and performance data
    const { data: workouts, error: workoutsError } = await supabase
      .from('cached_workouts')
      .select('*')
      .order('date', { ascending: false })
      .limit(5);

    if (workoutsError) throw workoutsError;

    // Generate personalized recommendations using OpenAI
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
            content: `Eres un entrenador personal experto que analiza datos de entrenamiento y proporciona recomendaciones personalizadas.
            Genera 4 recomendaciones específicas basadas en los últimos entrenamientos del usuario.
            Cada recomendación debe incluir: tipo (strength, recovery, training, nutrition), un emoji relacionado, y un mensaje conciso y accionable.`
          },
          {
            role: 'user',
            content: `Analiza estos entrenamientos recientes y genera recomendaciones: ${JSON.stringify(workouts)}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const data = await response.json();
    const recommendations = JSON.parse(data.choices[0].message.content);

    console.log('AI recommendations generated successfully');

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in get-ai-recommendations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});