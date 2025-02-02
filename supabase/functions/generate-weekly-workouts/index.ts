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

const workoutTypes = ['CrossFit', 'Special Forces', 'Hyrox', 'Home Workout'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const durations = ['30 min', '45 min', '60 min'];

const generateWorkoutPrompt = (date: string, workoutType: string, difficulty: string, duration: string) => {
  const workoutTypeGuides = {
    'CrossFit': `Generate a CrossFit workout following these rules:
    1. Alternate between AMRAP, EMOM, and FOR TIME formats throughout the week
    2. Include Olympic lifting, gymnastics, and metabolic conditioning
    3. Focus on compound movements and functional fitness
    4. Scale appropriately for ${difficulty} level
    5. Fit within ${duration} including warmup and cooldown`,
    
    'Special Forces': `Generate a Special Forces style workout following these rules:
    1. Focus on endurance, strength, and mental toughness
    2. Include rucking, calisthenics, and military-style drills
    3. Emphasize bodyweight exercises and cardio endurance
    4. Scale appropriately for ${difficulty} level
    5. Fit within ${duration} including warmup and cooldown`,
    
    'Hyrox': `Generate a Hyrox-specific workout following these rules:
    1. Focus on the 8 Hyrox workout stations
    2. Include sled push/pull, farmer's carries, and wall balls
    3. Emphasize cardio endurance and functional strength
    4. Scale appropriately for ${difficulty} level
    5. Fit within ${duration} including warmup and cooldown`,
    
    'Home Workout': `Generate a home workout following these rules:
    1. Use minimal equipment (bodyweight, resistance bands)
    2. Include cardio and strength elements
    3. Focus on functional movements
    4. Scale appropriately for ${difficulty} level
    5. Fit within ${duration} including warmup and cooldown`
  };

  return `Generate a structured ${workoutType} workout for ${date} following these specific guidelines:
  ${workoutTypeGuides[workoutType]}
  
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
        "section_type": "strength",
        "content": {
          "exercises": [
            {"name": "exercise name", "reps": "sets and reps scheme"}
          ]
        }
      },
      {
        "section_type": "wod",
        "content": {
          "type": "rounds OR amrap OR emom",
          "rounds": "number if type is rounds",
          "time": "duration if type is amrap or emom",
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
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting weekly workout generation...');
    
    // Generate workouts for the next 7 days
    const startDate = new Date();
    const promises = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];

      // Generate workouts for each combination
      for (const workoutType of workoutTypes) {
        for (const difficulty of difficulties) {
          for (const duration of durations) {
            console.log(`Generating workout for ${formattedDate}, ${workoutType}, ${difficulty}, ${duration}`);

            // Check if workout already exists
            const { data: existingWorkout } = await supabase
              .from('cached_workouts')
              .select('*')
              .eq('date', formattedDate)
              .eq('workout_type', workoutType)
              .eq('difficulty', difficulty)
              .eq('duration', duration)
              .single();

            if (!existingWorkout) {
              const prompt = generateWorkoutPrompt(formattedDate, workoutType, difficulty, duration);
              
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
                      content: 'You are an expert fitness coach specializing in creating structured workouts. Always respond with valid JSON matching the exact structure requested.' 
                    },
                    { role: 'user', content: prompt }
                  ],
                }),
              });

              if (!response.ok) {
                throw new Error(`OpenAI API error: ${await response.text()}`);
              }

              const aiResponse = await response.json();
              const workoutData = JSON.parse(aiResponse.choices[0].message.content);

              promises.push(
                supabase
                  .from('cached_workouts')
                  .insert({
                    date: formattedDate,
                    workout_type: workoutType,
                    difficulty: difficulty,
                    duration: duration,
                    workout_data: workoutData
                  })
              );
            }
          }
        }
      }
    }

    await Promise.all(promises);
    console.log('Weekly workout generation completed successfully');

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-weekly-workouts function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});