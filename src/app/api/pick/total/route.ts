import { NextRequest, NextResponse } from 'next/server';
import { generateTimestamps } from '@/lib/utils/date-utils';
import { PickRequest, PickResponse } from '@/types/api.types';
import { pickRequestSchema, pickResponseSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request
    const parseResult = pickRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.format() },
        { status: 400 }
      );
    }
    
    const pickRequest = parseResult.data as PickRequest;
    
    // Generate prediction (in a real app, this would use a model or algorithm)
    const prediction = generatePrediction(pickRequest);
    
    // Generate timestamps
    const timestamps = generateTimestamps();
    
    // Construct response
    const response: PickResponse = {
      league: pickRequest.league,
      game: {
        away: pickRequest.away,
        home: pickRequest.home,
        line: pickRequest.line,
        odds: pickRequest.odds,
      },
      pick: prediction.pick,
      confidence: prediction.confidence,
      reasoning: prediction.reasoning,
      signals: prediction.signals,
      ...timestamps,
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };
    
    // Validate response
    const validationResult = pickResponseSchema.safeParse(response);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in pick/total API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Generates a prediction for a game
 * @param request Pick request
 * @returns Prediction data
 */
function generatePrediction(request: PickRequest) {
  // In a real app, this would use a model or algorithm
  // For now, we'll use a simple random generator
  
  // Determine pick (Over or Under)
  const pick = Math.random() > 0.5 ? 'Over' : 'Under';
  
  // Generate confidence (between 0.5 and 0.9)
  const confidence = 0.5 + Math.random() * 0.4;
  
  // Generate reasoning
  let reasoning = '';
  if (pick === 'Over') {
    reasoning = `Both ${request.away} and ${request.home} have been scoring above their season averages in recent games. The total of ${request.line} seems achievable given the offensive capabilities of both teams.`;
  } else {
    reasoning = `Both ${request.away} and ${request.home} have strong defensive units that have been performing well lately. The total of ${request.line} seems high given the defensive matchup.`;
  }
  
  // Generate signals
  const signals = {
    recentFormNote: request.league === 'mlb' 
      ? `${request.away} averaging 5.2 runs and ${request.home} averaging 4.8 runs in their last 5 games.`
      : request.league === 'nba'
      ? `${request.away} averaging 112 points and ${request.home} averaging 108 points in their last 5 games.`
      : `${request.away} averaging 24 points and ${request.home} averaging 21 points in their last 3 games.`,
    injuryOrRestNote: Math.random() > 0.7 
      ? `${request.away}'s star player is questionable for this game.` 
      : null,
    contextNote: Math.random() > 0.6 
      ? `Weather conditions are favorable for scoring.` 
      : null,
  };
  
  return {
    pick,
    confidence,
    reasoning,
    signals,
  };
}

