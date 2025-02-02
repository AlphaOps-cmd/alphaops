import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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
    const { date, workoutType, difficulty, duration } = await req.json();
    console.log('Fetching workout for:', { date, workoutType, difficulty, duration });

    // Get cached workout using maybeSingle() instead of single()
    const { data: workout, error } = await supabase
      .from('cached_workouts')
      .select('workout_data')
      .eq('date', date)
      .eq('workout_type', workoutType)
      .eq('difficulty', difficulty)
      .eq('duration', duration)
      .maybeSingle();

    if (error) {
      console.error('Error fetching workout:', error);
      throw error;
    }

    if (!workout) {
      console.error('No workout found for the given parameters');
      return new Response(
        JSON.stringify({ 
          workout_sections: [
            {
              section_type: 'warmup',
              content: { exercises: [] }
            },
            {
              section_type: 'wod',
              content: { type: 'rounds', rounds: 3, exercises: [] }
            },
            {
              section_type: 'recovery',
              content: 'Cool down and stretch for 5-10 minutes'
            }
          ]
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    console.log('Successfully retrieved workout from cache');
    return new Response(JSON.stringify(workout.workout_data), {
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