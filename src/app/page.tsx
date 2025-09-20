"use client";

import { useState } from "react";
import { predictRestock } from "./actions";
import Link from "next/link";
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  // State for form inputs
  const [productName, setProductName] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [dailySales, setDailySales] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [safetyStock, setSafetyStock] = useState("");
  
  // State for results
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await predictRestock({
        productName,
        currentStock: parseInt(currentStock),
        dailySales: parseFloat(dailySales),
        leadTime: parseInt(leadTime),
        safetyStock: parseInt(safetyStock) || 0
      });
      
      setPredictionResult(result);
    } catch (err) {
      setError("Failed to calculate prediction. Please check your inputs and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset form
  const handleReset = () => {
    setProductName("");
    setCurrentStock("");
    setDailySales("");
    setLeadTime("");
    setSafetyStock("");
    setPredictionResult(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <SignedIn>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Inventory <span className="text-indigo-400">Restock Predictor</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Predict when your inventory will run out and automate restocking with our intelligent forecasting system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Dashboard
            </Link>
            <Link 
              href="/documentation" 
              className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Read Documentation
            </Link>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Input Form */}
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Predict Restock Timing</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label htmlFor="currentStock" className="block text-sm font-medium text-gray-300 mb-1">
                Current Stock Level
              </label>
              <input
                type="number"
                id="currentStock"
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Enter current stock quantity"
                required
                min="0"
              />
            </div>

            <div>
              <label htmlFor="dailySales" className="block text-sm font-medium text-gray-300 mb-1">
                Average Daily Sales
              </label>
              <input
                type="number"
                id="dailySales"
                value={dailySales}
                onChange={(e) => setDailySales(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Enter average daily sales"
                required
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label htmlFor="leadTime" className="block text-sm font-medium text-gray-300 mb-1">
                Supplier Lead Time (Days)
              </label>
              <input
                type="number"
                id="leadTime"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Enter supplier lead time in days"
                required
                min="0"
              />
            </div>

            <div>
              <label htmlFor="safetyStock" className="block text-sm font-medium text-gray-300 mb-1">
                Safety Stock Level (Optional)
              </label>
              <input
                type="number"
                id="safetyStock"
                value={safetyStock}
                onChange={(e) => setSafetyStock(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Enter safety stock level"
                min="0"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Calculating..." : "Predict Restock Timing"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-900 border border-red-700 rounded-md">
                <p className="text-red-200">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Results Panel */}
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Prediction Results</h2>
          
          {predictionResult ? (
            <div className="space-y-6">
              <div className={`p-4 rounded-md ${predictionResult.status === 'urgent' ? 'bg-red-900 border border-red-700' : 'bg-green-900 border border-green-700'}`}>
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-5 w-5 ${predictionResult.status === 'urgent' ? 'text-red-400' : 'text-green-400'}`}>
                    {predictionResult.status === 'urgent' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <h3 className={`ml-3 text-sm font-medium ${predictionResult.status === 'urgent' ? 'text-red-200' : 'text-green-200'}`}>
                    {predictionResult.status === 'urgent' 
                      ? 'Urgent Restock Required' 
                      : 'Stock Level is Healthy'}
                  </h3>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
                  <h4 className="text-lg font-medium text-white">{predictionResult.productName}</h4>
                </div>
                <div className="divide-y divide-gray-700">
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-gray-300">Current Stock</span>
                    <span className="font-medium text-white">{predictionResult.currentStock} units</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-gray-300">Average Daily Sales</span>
                    <span className="font-medium text-white">{predictionResult.dailySales} units</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-gray-300">Supplier Lead Time</span>
                    <span className="font-medium text-white">{predictionResult.leadTime} days</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-gray-300">Safety Stock</span>
                    <span className="font-medium text-white">{predictionResult.safetyStock} units</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-gray-300">Days Until Stockout</span>
                    <span className="font-medium text-white">{predictionResult.daysUntilStockout} days</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-gray-300">Recommended Restock Date</span>
                    <span className="font-medium text-indigo-400">{predictionResult.restockDate}</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-gray-300">Recommended Order Quantity</span>
                    <span className="font-medium text-white">{predictionResult.recommendedOrder} units</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 border border-blue-700 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-200">Restock Reminder</h3>
                    <div className="mt-2 text-sm text-blue-100">
                      <p>
                        A restock reminder will be sent to your team on {predictionResult.restockDate}.
                        Consider placing an order for {predictionResult.recommendedOrder} units with your supplier.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-300">No predictions yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter product information and click "Predict Restock Timing" to see results.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-300">
              Leverage historical sales data and predictive algorithms to forecast inventory needs with high accuracy.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Automated Alerts</h3>
            <p className="text-gray-300">
              Receive timely notifications via email, SMS, or Slack when it's time to restock your inventory.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Dashboard Overview</h3>
            <p className="text-gray-300">
              Monitor all your products in one place with our comprehensive dashboard and actionable insights.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-800 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Business Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  <span className="font-medium text-white">Reduce Stockouts:</span> Prevent lost sales due to out-of-stock items
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  <span className="font-medium text-white">Optimize Inventory Costs:</span> Reduce carrying costs by maintaining optimal stock levels
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  <span className="font-medium text-white">Improve Cash Flow:</span> Free up capital by reducing excess inventory
                </p>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  <span className="font-medium text-white">Enhance Customer Satisfaction:</span> Ensure product availability when customers want to buy
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  <span className="font-medium text-white">Automate Procurement:</span> Save time with automated restock recommendations
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  <span className="font-medium text-white">Data-Driven Decisions:</span> Make informed inventory decisions based on analytics
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Optimize Your Inventory?</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Join thousands of businesses that use our Inventory Restock Predictor to streamline their supply chain operations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </Link>
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Model Integration Section */}
      <div className="bg-gray-800 rounded-lg p-8 mt-16">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Model Integration</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300 mb-6">
            This application is designed to work with your custom inventory prediction model. 
            To connect your model, update the API configuration in the <code className="bg-gray-700 px-2 py-1 rounded">.env.local</code> file.
          </p>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <pre className="text-green-400 overflow-x-auto">
              <code>{`# .env.local
MODEL_API_URL=your-model-api-url
API_TOKEN=your-api-token`}</code>
            </pre>
          </div>
          
          <p className="text-gray-300 mb-6">
            The application expects your model to expose RESTful endpoints for:
          </p>
          
          <ul className="space-y-3 text-gray-300 mb-6">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-400 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3">POST /api/predict/:itemId - Generate restock predictions</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-400 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3">GET /api/inventory/items - Retrieve all inventory items</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-400 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3">POST /api/inventory/items - Add new inventory items</span>
            </li>
          </ul>
          
          <div className="text-center">
            <Link 
              href="/api-docs" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Full API Documentation
            </Link>
          </div>
        </div>
      </div>
      </SignedIn>
      <SignedOut>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to Inventory Restock Predictor</h2>
          <p className="text-gray-300 mb-6">Please sign in to access the inventory prediction features.</p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In to Continue
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}