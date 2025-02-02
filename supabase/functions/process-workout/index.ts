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

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = new Date(date).getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[dayOfWeek];

    // Define workout focus based on day
    const workoutFocus = {
      'Monday': 'Olympic lifting + short metabolic WOD',
      'Tuesday': 'Gymnastics and functional strength',
      'Wednesday': 'Endurance and aerobic capacity',
      'Thursday': 'EMOM/E4MOM with weights + advanced skills',
      'Friday': 'Max strength + long WOD',
      'Saturday': 'Team workout or hero WOD',
      'Sunday': 'Active recovery and mobility'
    };

    const prompt = `Generate an AlphaOps-style workout for ${currentDay} focusing on ${workoutFocus[currentDay]}.

The workout should follow this exact JSON structure:
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
        "type": "rounds",
        "rounds": 3,
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

Equipment available: Olympic bar, kettlebells, dumbbells, rings, climbing rope, ergometers (bike, row, ski), resistance bands, and sandbags.

Make sure to:
1. Include 4-5 warmup exercises focusing on mobility and activation
2. For strength section, follow the day's focus
3. Create a challenging but achievable WOD
4. Include proper recovery and mobility work
5. Use appropriate rep schemes and weights for the day's focus
6. IMPORTANT: Return only valid JSON matching the exact structure above`;

    console.log('Sending prompt to OpenAI...');

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
            content: 'You are an expert CrossFit and functional fitness coach specializing in creating AlphaOps-style workouts. Always respond with valid JSON matching the exact structure requested.' 
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
    console.log('Received response from OpenAI');
    
    let workout;
    try {
      const content = aiResponse.choices[0].message.content.trim();
      // Remove any markdown formatting if present
      const jsonContent = content.replace(/```json\n|\n```/g, '');
      workout = JSON.parse(jsonContent);
      console.log('Successfully parsed workout:', workout);
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