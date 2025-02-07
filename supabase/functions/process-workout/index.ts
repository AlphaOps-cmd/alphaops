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
    const { date, userId } = await req.json();
    console.log('Fetching workout and PRs for:', { date, userId });

    // Fetch user's personal records
    const { data: personalRecords, error: prError } = await supabase
      .from('personal_records')
      .select('*')
      .eq('user_id', userId);

    if (prError) {
      console.error('Error fetching personal records:', prError);
      throw prError;
    }

    // Create a map of exercise names to their 1RM values
    const prMap = personalRecords?.reduce((acc, record) => {
      acc[record.exercise_name.toLowerCase()] = record.one_rm;
      return acc;
    }, {} as Record<string, number>) || {};

    // Fetch base workout
    const { data: workout, error } = await supabase
      .from('cached_workouts')
      .select('workout_data')
      .eq('date', date)
      .eq('workout_type', 'Hybrid Functional')
      .maybeSingle();

    if (error) {
      console.error('Error fetching workout:', error);
      throw error;
    }

    let workoutData = workout?.workout_data;

    // If we have a workout, enhance it with OpenAI
    if (workoutData) {
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
              content: `You are an expert hybrid training coach. Given a workout and 1RM data, 
              create an intense hybrid functional workout that includes percentage-based weights. 
              Maintain the same structure but enhance exercises, add complexity, and calculate weights.
              Include strength, conditioning, and skill work.`
            },
            {
              role: 'user',
              content: `Base workout: ${JSON.stringify(workoutData)}
              Personal Records (1RM): ${JSON.stringify(prMap)}
              
              Enhance this workout to be more intense and hybrid-focused. Include:
              1. A thorough warmup with mobility and activation
              2. Strength portion with percentage-based weights
              3. Metabolic conditioning with varied movements
              4. Skill work
              5. Recovery protocol
              
              Calculate weights as percentages of 1RM where applicable.
              If no 1RM exists for an exercise, provide RPE guidelines instead.`
            }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${await response.text()}`);
      }

      const aiResponse = await response.json();
      try {
        workoutData = JSON.parse(aiResponse.choices[0].message.content);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        // Keep original workout if parsing fails
      }
    }

    // Return default structure if no workout found
    if (!workoutData) {
      workoutData = {
        workout_sections: [
          {
            section_type: 'warmup',
            content: {
              exercises: [
                { name: "Light jog", reps: "400m" },
                { name: "Dynamic stretching", reps: "5 mins" }
              ]
            }
          },
          {
            section_type: 'strength',
            content: {
              exercises: [
                { name: "Back Squat", reps: "5x5 @70-75% 1RM" }
              ]
            }
          },
          {
            section_type: 'wod',
            content: {
              type: 'rounds',
              rounds: 3,
              exercises: [
                { name: "Kettlebell Swings", reps: "20" },
                { name: "Push-ups", reps: "15" },
                { name: "Box Jumps", reps: "10" }
              ]
            }
          },
          {
            section_type: 'recovery',
            content: "5-10 minutes light stretching and mobility work"
          }
        ]
      };
    }

    console.log('Successfully processed workout');
    return new Response(JSON.stringify(workoutData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-workout function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
