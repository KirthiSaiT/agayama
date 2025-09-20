import { NextResponse } from 'next/server';
import { inventoryService } from '@/app/services/inventoryService';

// Handle POST requests for inventory predictions
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = parseInt(params.id);
    
    if (isNaN(itemId)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    // Get the request body for additional parameters
    const body = await request.json();
    
    // Call your model through the inventory service
    const prediction = await inventoryService.predictRestockTiming(itemId);
    
    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Prediction API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}

// Handle GET requests for inventory predictions
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = parseInt(params.id);
    
    if (isNaN(itemId)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    // Call your model through the inventory service
    const prediction = await inventoryService.predictRestockTiming(itemId);
    
    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Prediction API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}