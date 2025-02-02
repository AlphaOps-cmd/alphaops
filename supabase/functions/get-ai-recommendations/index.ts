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

    const { data: workouts, error: workoutsError } = await supabase
      .from('cached_workouts')
      .select('*')
      .order('date', { ascending: false })
      .limit(5);

    if (workoutsError) throw workoutsError;

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
            content: 'You are a fitness coach that analyzes workout data and provides personalized recommendations. Generate 4 recommendations based on the user\'s recent workouts. Each recommendation should include a type (strength, recovery, training, nutrition), an emoji icon, a message, and a color (border-red-500, border-blue-500, border-green-500, or border-yellow-500).'
          },
          {
            role: 'user',
            content: `Based on these recent workouts, generate 4 recommendations: ${JSON.stringify(workouts)}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const data = await response.json();
    const recommendations = [
      {
        type: 'strength',
        icon: '💪',
        message: 'Focus on compound movements today to maximize strength gains',
        color: 'border-blue-500'
      },
      {
        type: 'recovery',
        icon: '🧘‍♂️',
        message: 'Take time for mobility work and stretching',
        color: 'border-green-500'
      },
      {
        type: 'training',
        icon: '🎯',
        message: 'Increase intensity in your HIIT sessions',
        color: 'border-red-500'
      },
      {
        type: 'nutrition',
        icon: '🥗',
        message: 'Ensure adequate protein intake for muscle recovery',
        color: 'border-yellow-500'
      }
    ];

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