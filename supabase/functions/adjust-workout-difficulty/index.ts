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
    const { currentWorkout, targetDifficulty } = await req.json();
    console.log('Adjusting workout difficulty:', { targetDifficulty });

    const prompt = `Given this workout:
    ${JSON.stringify(currentWorkout)}
    
    Modify it for ${targetDifficulty} level athletes. Adjust exercises, reps, and weights accordingly.
    Also provide a specific warmup and cooldown routine tailored for this workout.
    
    Return in this exact JSON format:
    {
      "workout_sections": [
        {
          "section_type": "warmup",
          "content": {
            "exercises": [
              {"name": "exercise name", "reps": "repetitions or duration"}
            ]
          }
        },
        {
          "section_type": "wod",
          "content": {
            "type": "rounds OR fortime",
            "rounds": "number if type is rounds",
            "exercises": [
              {"name": "exercise name", "reps": "repetitions"}
            ]
          }
        },
        {
          "section_type": "recovery",
          "content": "detailed recovery instructions"
        }
      ]
    }`;

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
            content: 'You are an expert fitness coach specializing in CrossFit, Hyrox, and Special Forces training. Adjust workouts based on athlete level while maintaining the core stimulus of the workout.' 
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const aiResponse = await response.json();
    const adjustedWorkout = JSON.parse(aiResponse.choices[0].message.content);

    return new Response(JSON.stringify(adjustedWorkout), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in adjust-workout-difficulty function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});