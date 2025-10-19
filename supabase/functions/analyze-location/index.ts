import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude } = await req.json();
    
    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an advanced AI analyst specializing in urban data analysis. Given GPS coordinates, provide comprehensive location analysis.

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
{
  "locationName": "City/Area name",
  "weather": {
    "temperature": number (in Celsius),
    "condition": "Clear/Cloudy/Rainy/etc",
    "humidity": number (percentage),
    "windSpeed": number (km/h),
    "pressure": number (hPa),
    "forecast": [
      { "day": "Tomorrow/Tue/Wed", "high": number, "low": number }
    ]
  },
  "metrics": {
    "population": "formatted number with suffix",
    "populationChange": "+X% or -X%",
    "energyUsage": "formatted number with unit",
    "energyChange": "+X% or -X%",
    "waterSupply": "formatted number with unit",
    "waterChange": "+X% or -X%",
    "networkCoverage": "percentage or rating",
    "networkStatus": "Excellent/Good/Fair"
  },
  "traffic": {
    "areas": [
      {
        "area": "area name",
        "level": number (0-100),
        "status": "clear/moderate/busy/congested",
        "trend": "up/down"
      }
    ],
    "averageSpeed": "number with unit",
    "activeVehicles": "formatted number"
  },
  "predictions": {
    "trafficForecast": [
      { "time": "HH:MM", "value": number (0-100) }
    ],
    "insights": [
      {
        "title": "prediction title",
        "value": "prediction value",
        "status": "warning/info/success",
        "type": "peak/energy/quality"
      }
    ],
    "aiInsight": "detailed insight text"
  },
  "accidentProneAreas": [
    {
      "area": "location name",
      "riskLevel": "High/Medium/Low",
      "accidents": "number in last year",
      "description": "brief description"
    }
  ]
}`;

    const userPrompt = `Analyze location at coordinates: ${latitude}, ${longitude}

Provide real-time data analysis for this location including:
1. Current weather conditions and 3-day forecast
2. Population and city metrics
3. Traffic patterns and congestion levels
4. Energy usage and water supply data
5. Network coverage quality
6. AI predictions for the next 24 hours
7. Accident-prone areas near this location

Return comprehensive, realistic data in the specified JSON format.`;

    console.log('Calling Lovable AI Gateway for location analysis...');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${aiResponse.status} ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0]?.message?.content || '';
    
    console.log('AI response content:', content);

    // Try to parse JSON from the response
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content];
      const jsonStr = jsonMatch[1].trim();
      analysisData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return a fallback structure
      analysisData = {
        locationName: "Unknown Location",
        weather: {
          temperature: 24,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
          pressure: 1013,
          forecast: [
            { day: "Tomorrow", high: 26, low: 18 },
            { day: "Tue", high: 25, low: 17 },
            { day: "Wed", high: 23, low: 16 }
          ]
        },
        metrics: {
          population: "N/A",
          populationChange: "N/A",
          energyUsage: "N/A",
          energyChange: "N/A",
          waterSupply: "N/A",
          waterChange: "N/A",
          networkCoverage: "N/A",
          networkStatus: "N/A"
        },
        traffic: {
          areas: [],
          averageSpeed: "N/A",
          activeVehicles: "N/A"
        },
        predictions: {
          trafficForecast: [],
          insights: [],
          aiInsight: "Unable to generate predictions at this time."
        },
        accidentProneAreas: []
      };
    }

    return new Response(
      JSON.stringify({ success: true, data: analysisData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-location function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});