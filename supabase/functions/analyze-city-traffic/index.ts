import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { city } = await req.json();
    console.log('Analyzing traffic for city:', city);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert traffic analysis AI agent for Indian cities. 
    Your task is to analyze traffic patterns, city infrastructure, and provide detailed route recommendations.
    
    For the given city, you should:
    1. Identify major traffic hotspots and congestion areas
    2. Suggest traffic-free or low-traffic routes
    3. Provide alternative routes that typically have heavy traffic
    4. Include time estimates and distance for each route
    5. Give traffic status (Clear, Moderate, Heavy, Congested)
    6. Provide AI-powered insights and predictions
    7. Analyze city population, energy usage, water supply network status
    
    Format your response as a structured JSON object with:
    {
      "city": "city name",
      "analysis": "overall traffic analysis",
      "cityMetrics": {
        "population": "population count with unit (e.g., 1.2M)",
        "populationChange": "percentage change (e.g., +2.3%)",
        "energyUsage": "energy usage with unit (e.g., 456 MW)",
        "energyChange": "percentage change (e.g., -5.1%)",
        "waterSupply": "water supply coverage percentage (e.g., 98%)",
        "waterChange": "percentage change (e.g., +1.2%)",
        "networkCoverage": "network coverage percentage (e.g., 99.9%)",
        "networkStatus": "status (e.g., Stable)"
      },
      "trafficFreeRoutes": [
        {
          "name": "route name",
          "from": "starting point",
          "to": "destination",
          "distance": "distance in km",
          "estimatedTime": "time estimate",
          "trafficStatus": "Clear/Moderate",
          "description": "why this route is recommended"
        }
      ],
      "trafficRoutes": [
        {
          "name": "route name",
          "from": "starting point",
          "to": "destination",
          "distance": "distance in km",
          "estimatedTime": "time estimate",
          "trafficStatus": "Heavy/Congested",
          "description": "why this route has traffic",
          "alternativeRoute": "suggested alternative"
        }
      ],
      "aiInsights": [
        "insight 1",
        "insight 2",
        "insight 3"
      ],
      "bestTimes": "best times to travel",
      "prediction": "traffic prediction for next few hours"
    }`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Analyze traffic patterns, city infrastructure, population, energy usage, and water supply network for ${city}, India. Provide detailed traffic-free routes and traffic-heavy routes with AI insights and city metrics.` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);

    // Try to extract JSON from the response
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = aiResponse.match(/```json\n?([\s\S]*?)\n?```/) || aiResponse.match(/```\n?([\s\S]*?)\n?```/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
      analysisData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // If parsing fails, return a structured error with the raw response
      analysisData = {
        city: city,
        analysis: aiResponse,
        cityMetrics: {
          population: "N/A",
          populationChange: "N/A",
          energyUsage: "N/A",
          energyChange: "N/A",
          waterSupply: "N/A",
          waterChange: "N/A",
          networkCoverage: "N/A",
          networkStatus: "N/A"
        },
        trafficFreeRoutes: [],
        trafficRoutes: [],
        aiInsights: ['Unable to parse structured data. Please try again.'],
        bestTimes: 'N/A',
        prediction: 'N/A'
      };
    }

    return new Response(
      JSON.stringify({ success: true, data: analysisData }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in analyze-city-traffic:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
