"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  currentStock: number;
  dailySales: number;
  leadTime: number;
  safetyStock: number;
  daysUntilStockout: number;
  restockDate: string;
  recommendedOrder: number;
  status: "safe" | "warning" | "urgent";
  confidenceScore?: number;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDataAvailable, setNewDataAvailable] = useState(false);

  // Fetch real data from your model/API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to your model
        // Example API call:
        /*
        const response = await fetch('/api/inventory/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        */
        
        // Simulate API call to your model with more realistic data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // This would come from your actual API/model
        const dynamicProducts: Product[] = [
          {
            id: 1,
            name: "Wireless Headphones",
            currentStock: 45,
            dailySales: 3.2,
            leadTime: 5,
            safetyStock: 10,
            daysUntilStockout: 11,
            restockDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toDateString(),
            recommendedOrder: 50,
            status: "safe",
            confidenceScore: 0.92
          },
          {
            id: 2,
            name: "Smartphone Charger",
            currentStock: 22,
            dailySales: 8.5,
            leadTime: 3,
            safetyStock: 5,
            daysUntilStockout: 2,
            restockDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toDateString(),
            recommendedOrder: 40,
            status: "urgent",
            confidenceScore: 0.87
          },
          {
            id: 3,
            name: "Bluetooth Speaker",
            currentStock: 18,
            dailySales: 1.8,
            leadTime: 7,
            safetyStock: 5,
            daysUntilStockout: 7,
            restockDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString(),
            recommendedOrder: 25,
            status: "warning",
            confidenceScore: 0.78
          },
          {
            id: 4,
            name: "USB-C Cable",
            currentStock: 120,
            dailySales: 12.3,
            leadTime: 2,
            safetyStock: 20,
            daysUntilStockout: 8,
            restockDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString(),
            recommendedOrder: 100,
            status: "safe",
            confidenceScore: 0.95
          },
          {
            id: 5,
            name: "Laptop Stand",
            currentStock: 9,
            dailySales: 1.1,
            leadTime: 4,
            safetyStock: 3,
            daysUntilStockout: 5,
            restockDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString(),
            recommendedOrder: 15,
            status: "warning",
            confidenceScore: 0.81
          }
        ];
        
        // In a real implementation, this data would come from your model
        setProducts(dynamicProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load inventory data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Group products by status
  const urgentProducts = products.filter(product => product.status === "urgent");
  const warningProducts = products.filter(product => product.status === "warning");
  const safeProducts = products.filter(product => product.status === "safe");

  // Calculate summary statistics
  const totalProducts = products.length;
  const urgentCount = urgentProducts.length;
  const warningCount = warningProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Inventory Dashboard</h1>
        <p className="text-gray-300">
          Monitor your inventory levels and restock predictions
        </p>
      </div>

      {newDataAvailable && (
        <div className="mb-6 p-4 bg-green-900 border border-green-700 rounded-md">
          <div className="flex justify-between items-center">
            <p className="text-green-200">
              New inventory data has been processed! Updated predictions are now available.
            </p>
            <button 
              onClick={() => setNewDataAvailable(false)}
              className="text-green-300 hover:text-green-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-md">
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-900 rounded-md p-3">
              <svg className="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-300">Total Products</h3>
              <p className="text-2xl font-semibold text-white">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-900 rounded-md p-3">
              <svg className="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-300">Needs Attention</h3>
              <p className="text-2xl font-semibold text-white">{warningCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-900 rounded-md p-3">
              <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-300">Urgent Restocks</h3>
              <p className="text-2xl font-semibold text-white">{urgentCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Required Section */}
      {(urgentProducts.length > 0 || warningProducts.length > 0) && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Action Required</h2>
          </div>
          
          {urgentProducts.length > 0 && (
            <div className="bg-red-900 border border-red-700 rounded-lg mb-6">
              <div className="px-4 py-3 border-b border-red-700">
                <h3 className="text-lg font-medium text-red-200 flex items-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Urgent Restocks Needed
                </h3>
              </div>
              <div className="divide-y divide-red-700">
                {urgentProducts.map((product) => (
                  <div key={product.id} className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white">{product.name}</h4>
                      <p className="text-sm text-gray-300">Stock out in {product.daysUntilStockout} days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-300">{product.restockDate}</p>
                      <p className="text-sm text-gray-300">{product.recommendedOrder} units</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {warningProducts.length > 0 && (
            <div className="bg-yellow-900 border border-yellow-700 rounded-lg">
              <div className="px-4 py-3 border-b border-yellow-700">
                <h3 className="text-lg font-medium text-yellow-200 flex items-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Items Needing Attention
                </h3>
              </div>
              <div className="divide-y divide-yellow-700">
                {warningProducts.map((product) => (
                  <div key={product.id} className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white">{product.name}</h4>
                      <p className="text-sm text-gray-300">Stock out in {product.daysUntilStockout} days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-yellow-300">{product.restockDate}</p>
                      <p className="text-sm text-gray-300">{product.recommendedOrder} units</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* All Products Table */}
      <div className="bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">All Products</h2>
            <Link 
              href="/inventory" 
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Data
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Current Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Daily Sales
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Days Until Stockout
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Restock Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{product.currentStock} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{product.dailySales}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{product.daysUntilStockout} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{product.restockDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "urgent" 
                          ? "bg-red-900 text-red-200" 
                          : product.status === "warning" 
                            ? "bg-yellow-900 text-yellow-200" 
                            : "bg-green-900 text-green-200"
                      }`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {product.confidenceScore ? `${(product.confidenceScore * 100).toFixed(1)}%` : 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-700 sm:px-6">
          <Link 
            href="/inventory" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload New Inventory Data
          </Link>
        </div>
      </div>
    </div>
  );
}