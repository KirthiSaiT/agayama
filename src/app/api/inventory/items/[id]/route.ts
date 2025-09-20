import { NextResponse } from 'next/server';
import { inventoryService } from '@/app/services/inventoryService';

// Handle GET requests for a specific inventory item
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
    
    const item = await inventoryService.getInventoryItem(itemId);
    
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error('Failed to fetch inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory item' },
      { status: 500 }
    );
  }
}

// Handle PUT requests to update an inventory item
export async function PUT(
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
    
    const updateData = await request.json();
    const updatedItem = await inventoryService.updateInventoryItem(itemId, updateData);
    
    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Failed to update inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to update inventory item' },
      { status: 500 }
    );
  }
}

// Handle DELETE requests to remove an inventory item
export async function DELETE(
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
    
    const deleted = await inventoryService.deleteInventoryItem(itemId);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to delete inventory item' },
      { status: 500 }
    );
  }
}