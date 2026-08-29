import { NextRequest, NextResponse } from 'next/server'
import { aj } from '../arcjet/routes';


import OpenAI from "openai"
import { currentUser } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // or process.env.OPENROUTER_API_KEY
})

const PROMPT = `
You are an AI Trip Planner Agent.

Ask one question at a time in this order:
1. Starting location
2. Destination
3. Group size
4. Budget
5. Trip duration

IMPORTANT:

You MUST ALWAYS return JSON in this format:

{
  "resp": "your message",
  "ui": "groupSize | budget | days | final | none"
}

Rules:
- When asking group size → ui = "groupSize"
- When asking budget → ui = "budget"
- When asking trip duration → ui = "days"
- When finished → ui = "final"
- Otherwise → ui = "none"

Do NOT return anything outside JSON.
`;

const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with PlaceName, Place Details, Place Image Url, Geo Coordinates, Place address, ticket Pricing, Time travel each of the location, with each day plan with best time to visit in JSON format.

Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`;



export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();

  const user= await currentUser();
  const {has} =await auth();
  const hasPremiumAccess = has({ plan: 'monthly' })
  const decision = await aj.protect(req, { userId:user?.primaryEmailAddress?.emailAddress??'|', requested: isFinal?.5:0 });
  console.log(decision);
  //@ts-ignore
  if(decision?.reason?.remaining==0 && !hasPremiumAccess){
    return NextResponse.json({
      resp:'No Free Credit Remaining',
      ui:'limit'
    })
  }

  try {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4.1-mini",
    response_format:{type:'json_object'},
    messages: [
      {
        role: "system",
        content: isFinal?FINAL_PROMPT: PROMPT
      },
      ...messages
    ],
  });
  
  console.log(completion.choices[0].message);
  const Message = completion.choices[0].message;
  return NextResponse.json(JSON.parse(Message.content ?? ''));
} 
catch(e){
  return NextResponse.json(e)
}
}
