
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
            content: `You are a hybrid training fitness coach specializing in functional fitness and mixed training modalities. 
            Analyze workout data and provide 4 personalized recommendations focused on improving hybrid training performance. 
            Each recommendation should target different aspects: strength, conditioning, skill development, and recovery.
            Consider recent workout patterns, frequency, and intensity to provide adaptive recommendations.`
          },
          {
            role: 'user',
            content: `Based on these recent workouts, generate 4 specific hybrid training recommendations: ${JSON.stringify(workouts)}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Fallback recommendations in case of parsing issues
    let recommendations = [
      {
        type: 'strength',
        icon: '💪',
        message: 'Incorporate compound movements like thrusters and clean & jerks in your next session',
        color: 'border-blue-500'
      },
      {
        type: 'conditioning',
        icon: '🏃‍♂️',
        message: 'Add 2-3 short EMOMs to your strength work for better hybrid conditioning',
        color: 'border-red-500'
      },
      {
        type: 'skill',
        icon: '🎯',
        message: 'Practice Olympic lifting technique with light weights for better movement patterns',
        color: 'border-yellow-500'
      },
      {
        type: 'recovery',
        icon: '🧘‍♂️',
        message: 'Include mobility work focusing on shoulders and hips for better movement quality',
        color: 'border-green-500'
      }
    ];

    try {
      // Try to parse AI response if it's in a valid format
      const parsedRecommendations = JSON.parse(aiResponse);
      if (Array.isArray(parsedRecommendations) && parsedRecommendations.length === 4) {
        recommendations = parsedRecommendations;
      }
    } catch (parseError) {
      console.error('Error parsing AI recommendations:', parseError);
      // Use fallback recommendations defined above
    }

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
