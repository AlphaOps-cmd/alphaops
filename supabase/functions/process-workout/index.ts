import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();
    console.log('Generating workout for date:', date);

    const prompt = `
      As a CrossFit coach, generate a complete workout program that includes:
      
      1. A warmup section with 4-5 exercises (include name and reps/duration for each)
      2. A strength section with 1-2 exercises (include name and reps/sets)
      3. A WOD (Workout of the Day) that can be either:
         - For rounds (3-5 rounds of specific exercises)
         - For time (complete all exercises as fast as possible)
      4. A recovery/cooldown routine with specific stretches and duration
      
      Respond with this exact JSON structure:
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
              "type": "rounds OR fortime",
              "rounds": "number (only if type is rounds)",
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
            content: 'You are an expert CrossFit coach generating complete workout programs. Always respond with valid JSON matching the exact structure requested.' 
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      throw new Error('Failed to generate workout with OpenAI');
    }

    const aiResponse = await response.json();
    console.log('OpenAI response:', aiResponse);
    
    let workout;
    try {
      const content = aiResponse.choices[0].message.content.trim();
      workout = JSON.parse(content);
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      console.log('Raw response content:', aiResponse.choices[0].message.content);
      throw new Error('Failed to parse OpenAI response');
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