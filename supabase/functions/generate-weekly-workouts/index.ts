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

const workoutTypes = ['CrossFit', 'Special Forces', 'Hyrox'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting weekly workout generation...');
    
    // Generate workouts for the next 7 days
    const startDate = new Date();
    const promises = [];

    // First, delete all existing workouts to prevent duplicates
    const { error: deleteError } = await supabase
      .from('cached_workouts')
      .delete()
      .gte('date', startDate.toISOString().split('T')[0]);

    if (deleteError) {
      console.error('Error deleting existing workouts:', deleteError);
      throw deleteError;
    }

    // Your provided workout data
    const workouts = {
      CrossFit: {
        // ... Your CrossFit workouts for each day
        Monday: {
          warmup: {
            exercises: [
              { name: "Trote", reps: "400m" },
              { name: "Sentadillas aéreas", reps: "10" },
              { name: "Flexiones", reps: "10" },
              { name: "Remo en anillas", reps: "10" }
            ]
          },
          strength: {
            exercises: [
              { name: "Back Squat", reps: "5x5 al 75-80% de 1RM" }
            ]
          },
          wod: {
            type: "rounds",
            rounds: 3,
            exercises: [
              { name: "Thrusters", reps: "15" },
              { name: "Pull-ups", reps: "12" },
              { name: "Burpees", reps: "9" }
            ]
          },
          recovery: "5-10 minutos de foam rolling enfocado en piernas y espalda. Estiramientos estáticos (cuádriceps, isquiotibiales y hombros)."
        },
        // ... Add other days similarly
      },
      "Special Forces": {
        Monday: {
          warmup: {
            exercises: [
              { name: "Trote suave", reps: "10 minutos" },
              { name: "Movilidad dinámica", reps: "5 minutos" }
            ]
          },
          wod: {
            type: "rounds",
            rounds: 4,
            exercises: [
              { name: "Carrera", reps: "400m" },
              { name: "Push-ups", reps: "20" },
              { name: "Sentadillas aéreas", reps: "20" },
              { name: "Pull-ups", reps: "10" }
            ]
          },
          recovery: "10 minutos de caminata de enfriamiento y estiramientos estáticos para pectorales y piernas."
        },
        // ... Add other days similarly
      },
      Hyrox: {
        Monday: {
          warmup: {
            exercises: [
              { name: "Remo o bicicleta estática", reps: "5 minutos" },
              { name: "Movilidad dinámica", reps: "5 minutos" }
            ]
          },
          wod: {
            type: "rounds",
            rounds: 3,
            exercises: [
              { name: "Carrera", reps: "500m" },
              { name: "Wall Balls", reps: "15" },
              { name: "Sled Pushes", reps: "10x25m" },
              { name: "Burpees", reps: "15" }
            ]
          },
          recovery: "5-10 minutos de trote suave y estiramientos en miembros inferiores."
        },
        // ... Add other days similarly
      }
    };

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];

      // Generate workouts for each combination
      for (const workoutType of workoutTypes) {
        for (const difficulty of difficulties) {
          const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
          const workout = workouts[workoutType][dayOfWeek];

          if (workout) {
            promises.push(
              supabase
                .from('cached_workouts')
                .insert({
                  date: formattedDate,
                  workout_type: workoutType,
                  difficulty: difficulty,
                  workout_data: {
                    workout_sections: [
                      {
                        section_type: "warmup",
                        content: workout.warmup
                      },
                      workout.strength && {
                        section_type: "strength",
                        content: workout.strength
                      },
                      {
                        section_type: "wod",
                        content: workout.wod
                      },
                      {
                        section_type: "recovery",
                        content: workout.recovery
                      }
                    ].filter(Boolean)
                  }
                })
            );
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