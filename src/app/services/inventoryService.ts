// This file represents the integration with your actual model
// In a full implementation, this would connect to your model API

export interface InventoryItem {
  id: number;
  name: string;
  currentStock: number;
  dailySalesAverage: number;
  leadTimeDays: number;
  safetyStock: number;
  lastRestockDate?: Date;
  supplierId?: number;
}

export interface PredictionResult {
  itemId: number;
  daysUntilStockout: number;
  recommendedRestockDate: Date;
  recommendedOrderQuantity: number;
  confidenceScore: number; // 0-1 scale
  status: 'safe' | 'warning' | 'urgent';
  // Additional fields from your model
  predictedDemand?: number[];
  seasonalFactors?: number[];
  trendAnalysis?: string;
  riskFactors?: string[];
}

export interface Supplier {
  id: number;
  name: string;
  leadTimeDays: number;
  reliabilityScore: number; // 0-1 scale
  contactInfo: string;
}

export interface RestockAlert {
  product_name: string;
  stock_out_date: string;
  current_stock: number;
  suggested_restock: number;
}

export class InventoryService {
  // Base URL for your model API
  private API_BASE_URL = process.env.MODEL_API_URL || 'http://localhost:5000/api';
  
  // In a real implementation, this would connect to a database
  private inventoryItems: InventoryItem[] = [];
  private suppliers: Supplier[] = [];

  async getInventoryItems(): Promise<InventoryItem[]> {
    try {
      // Call your actual model API
      const response = await fetch(`${this.API_BASE_URL}/inventory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch inventory items: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      // Fallback to local data if API is unavailable
      return this.inventoryItems;
    }
  }

  async getInventoryItem(id: number): Promise<InventoryItem | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/inventory/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch inventory item: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching inventory item ${id}:`, error);
      // Fallback to local data if API is unavailable
      return this.inventoryItems.find(item => item.id === id) || null;
    }
  }

  async addInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/inventory/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to add inventory item: ${response.statusText}`);
      }
      
      const newItem = await response.json();
      return newItem;
    } catch (error) {
      console.error("Error adding inventory item:", error);
      // Fallback to local implementation if API is unavailable
      const newItem: InventoryItem = {
        ...item,
        id: this.generateId()
      };
      this.inventoryItems.push(newItem);
      return newItem;
    }
  }

  async updateInventoryItem(id: number, updates: Partial<InventoryItem>): Promise<InventoryItem | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/inventory/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to update inventory item: ${response.statusText}`);
      }
      
      const updatedItem = await response.json();
      return updatedItem;
    } catch (error) {
      console.error(`Error updating inventory item ${id}:`, error);
      // Fallback to local implementation if API is unavailable
      const index = this.inventoryItems.findIndex(item => item.id === id);
      if (index === -1) return null;
      
      this.inventoryItems[index] = { ...this.inventoryItems[index], ...updates };
      return this.inventoryItems[index];
    }
  }

  async deleteInventoryItem(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/inventory/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return false;
        }
        throw new Error(`Failed to delete inventory item: ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting inventory item ${id}:`, error);
      // Fallback to local implementation if API is unavailable
      const initialLength = this.inventoryItems.length;
      this.inventoryItems = this.inventoryItems.filter(item => item.id !== id);
      return this.inventoryItems.length < initialLength;
    }
  }

  async predictRestockTiming(itemId: number): Promise<PredictionResult> {
    try {
      // Call your actual model API for prediction
      const response = await fetch(`${this.API_BASE_URL}/predict/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can send additional parameters for the prediction
        body: JSON.stringify({
          predictionHorizon: 30, // days
          includeSeasonality: true,
          includeTrends: true
        })
      });
      
      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.statusText}`);
      }
      
      const predictionResult: PredictionResult = await response.json();
      return predictionResult;
    } catch (error) {
      console.error(`Error predicting restock timing for item ${itemId}:`, error);
      
      // Fallback to local calculation if model API is unavailable
      const item = await this.getInventoryItem(itemId);
      if (!item) {
        throw new Error(`Inventory item with id ${itemId} not found`);
      }

      // Calculate days until stockout
      const daysUntilStockout = item.dailySalesAverage > 0 
        ? (item.currentStock - item.safetyStock) / item.dailySalesAverage 
        : 0;

      // Calculate recommended restock date
      const today = new Date();
      const recommendedRestockDate = new Date(today);
      recommendedRestockDate.setDate(today.getDate() + Math.max(0, Math.ceil(daysUntilStockout) - item.leadTimeDays));

      // Calculate recommended order quantity (with 14-day buffer)
      const recommendedOrderQuantity = item.dailySalesAverage > 0 
        ? Math.ceil(item.dailySalesAverage * (item.leadTimeDays + 14)) 
        : 0;

      // Determine status based on time until stockout
      let status: 'safe' | 'warning' | 'urgent' = 'safe';
      if (daysUntilStockout <= 3) {
        status = 'urgent';
      } else if (daysUntilStockout <= 7) {
        status = 'warning';
      }

      // Calculate confidence score based on data quality
      const confidenceScore = this.calculateConfidenceScore(item);

      return {
        itemId,
        daysUntilStockout: Math.ceil(daysUntilStockout),
        recommendedRestockDate,
        recommendedOrderQuantity,
        confidenceScore,
        status
      };
    }
  }

  // New method to upload CSV files and trigger prediction
  async uploadInventoryData(historicalData: File, currentInventory: File): Promise<{alerts: RestockAlert[], message: string}> {
    try {
      const formData = new FormData();
      formData.append('historical_data', historicalData);
      formData.append('stock_data', currentInventory);
      
      const response = await fetch(`${this.API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload data: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error uploading inventory data:", error);
      // Check if it's a connection error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Failed to connect to the prediction service. Please make sure the backend server is running.');
      }
      throw new Error(`Failed to upload inventory data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // New method to get restock alerts
  async getRestockAlerts(): Promise<RestockAlert[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/alerts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch alerts: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.alerts || [];
    } catch (error) {
      console.error("Error fetching restock alerts:", error);
      // Check if it's a connection error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Failed to connect to the prediction service. Please make sure the backend server is running.');
      }
      return [];
    }
  }

  async getSupplier(id: number): Promise<Supplier | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/suppliers/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch supplier: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching supplier ${id}:`, error);
      // Fallback to local data if API is unavailable
      return this.suppliers.find(supplier => supplier.id === id) || null;
    }
  }

  async getSuppliers(): Promise<Supplier[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/suppliers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch suppliers: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      // Fallback to local data if API is unavailable
      return this.suppliers;
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  private calculateConfidenceScore(item: InventoryItem): number {
    // Simple confidence calculation based on data availability
    let score = 0.5; // Base score
    
    // Add points for having daily sales data
    if (item.dailySalesAverage > 0) score += 0.2;
    
    // Add points for having lead time data
    if (item.leadTimeDays > 0) score += 0.2;
    
    // Add points for having safety stock defined
    if (item.safetyStock >= 0) score += 0.1;
    
    // Cap at 1.0
    return Math.min(score, 1.0);
  }
}

// Export a singleton instance for use throughout the application
export const inventoryService = new InventoryService();