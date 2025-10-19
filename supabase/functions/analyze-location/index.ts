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

    const systemPrompt = `You are an advanced AI urban data analyst with access to real-world geographic, traffic, and infrastructure databases. Given GPS coordinates, provide accurate, data-driven location analysis based on actual city characteristics, infrastructure, and patterns.

CRITICAL INSTRUCTIONS:
1. Identify the EXACT city/area from coordinates
2. Use REALISTIC data based on actual city characteristics
3. For accident-prone areas: mention REAL major roads, junctions, and intersections that exist in that city
4. For traffic: reference ACTUAL busy roads and areas known in that city
5. Weather should reflect the region's typical climate
6. Population and infrastructure metrics should be based on the city's actual size and development level

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
{
  "locationName": "Precise City/Area name with state/country",
  "weather": {
    "temperature": number (realistic for region),
    "condition": "Accurate current weather",
    "humidity": number (realistic for climate),
    "windSpeed": number (typical for area),
    "pressure": number (realistic atmospheric),
    "forecast": [
      { "day": "Tomorrow/Tue/Wed", "high": number, "low": number }
    ]
  },
  "metrics": {
    "population": "actual city population",
    "populationChange": "realistic growth rate",
    "energyUsage": "realistic power consumption",
    "energyChange": "typical variation",
    "waterSupply": "actual supply capacity",
    "waterChange": "realistic variation",
    "networkCoverage": "actual telecom coverage",
    "networkStatus": "realistic status"
  },
  "traffic": {
    "areas": [
      {
        "area": "REAL road/junction name from the city",
        "level": number (0-100, realistic for that location),
        "status": "clear/moderate/busy/congested",
        "trend": "up/down"
      }
    ],
    "averageSpeed": "realistic speed for city",
    "activeVehicles": "realistic vehicle count"
  },
  "predictions": {
    "trafficForecast": [
      { "time": "HH:MM", "value": number (realistic hourly pattern) }
    ],
    "insights": [
      {
        "title": "realistic prediction",
        "value": "specific, actionable insight",
        "status": "warning/info/success",
        "type": "peak/energy/quality"
      }
    ],
    "aiInsight": "specific insight based on actual city characteristics and patterns"
  },
  "accidentProneAreas": [
    {
      "area": "REAL junction/road name that exists in the city",
      "riskLevel": "High/Medium/Low (based on actual traffic patterns)",
      "accidents": "realistic number based on city size",
      "description": "specific description of why this actual location is risky"
    }
  ]
}

PROVIDE AT LEAST 3-5 ACCIDENT PRONE AREAS with real, well-known locations from the identified city.`;

    const userPrompt = `Analyze location at coordinates: ${latitude}, ${longitude}

REQUIREMENTS:
1. First, identify the EXACT city/area from these coordinates
2. Research and provide data specific to this actual location
3. For accident-prone areas: Identify 3-5 REAL, well-known dangerous roads, junctions, or intersections in this city
   - Use actual street names and landmarks that exist
   - Mention specific reasons why each location is accident-prone
   - Base accident counts on realistic patterns for that city's size
4. For traffic areas: Use REAL major roads and highways from this city
5. All metrics should reflect the actual city's size, development, and infrastructure
6. Weather should match the region's current climate patterns
7. Provide location-specific insights based on known characteristics

Return accurate, location-specific data in the specified JSON format.`;

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