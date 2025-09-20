import { NextResponse } from 'next/server';
import { inventoryService } from '@/app/services/inventoryService';

// Handle GET requests for all inventory items
export async function GET() {
  try {
    const items = await inventoryService.getInventoryItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to fetch inventory items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory items' },
      { status: 500 }
    );
  }
}

// Handle POST requests to add a new inventory item
export async function POST(request: Request) {
  try {
    const itemData = await request.json();
    
    // Validate required fields
    if (!itemData.name || itemData.currentStock === undefined || itemData.dailySalesAverage === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, currentStock, dailySalesAverage' },
        { status: 400 }
      );
    }
    
    const newItem = await inventoryService.addInventoryItem(itemData);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Failed to add inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to add inventory item' },
      { status: 500 }
    );
  }
}