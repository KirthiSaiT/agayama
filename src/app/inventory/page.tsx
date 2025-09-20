"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { inventoryService, RestockAlert } from "@/app/services/inventoryService";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function Inventory() {
  const [historicalFile, setHistoricalFile] = useState<File | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<RestockAlert[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"online" | "offline" | "checking">("checking");
  
  const historicalFileRef = useRef<HTMLInputElement>(null);
  const currentFileRef = useRef<HTMLInputElement>(null);

  const handleHistoricalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setHistoricalFile(e.target.files[0]);
    }
  };

  const handleCurrentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentFile(e.target.files[0]);
    }
  };

  const checkBackendStatus = async () => {
    setBackendStatus("checking");
    try {
      const response = await fetch('http://localhost:5000/api/health');
      if (response.ok) {
        setBackendStatus("online");
      } else {
        setBackendStatus("offline");
      }
    } catch (error) {
      setBackendStatus("offline");
    }
  };

  const handleUpload = async () => {
    if (!historicalFile || !currentFile) {
      setUploadError("Please select both files before uploading.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadStatus(null);

    try {
      // Upload files to the Flask backend
      const result = await inventoryService.uploadInventoryData(historicalFile, currentFile);
      
      setUploadStatus(result.message || "Files uploaded successfully! Processing data...");
      
      // Fetch alerts after successful upload
      await fetchAlerts();
      
      // Reset file inputs
      setHistoricalFile(null);
      setCurrentFile(null);
      if (historicalFileRef.current) historicalFileRef.current.value = "";
      if (currentFileRef.current) currentFileRef.current.value = "";
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError(error.message || "An error occurred while uploading files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const fetchAlerts = async () => {
    setIsLoadingAlerts(true);
    try {
      const fetchedAlerts = await inventoryService.getRestockAlerts();
      setAlerts(fetchedAlerts);
    } catch (error: any) {
      console.error("Error fetching alerts:", error);
      setUploadError(error.message || "Failed to fetch restock alerts.");
    } finally {
      setIsLoadingAlerts(false);
    }
  };

  const handleReset = () => {
    setHistoricalFile(null);
    setCurrentFile(null);
    setUploadStatus(null);
    setUploadError(null);
    if (historicalFileRef.current) historicalFileRef.current.value = "";
    if (currentFileRef.current) currentFileRef.current.value = "";
  };

  // Fetch alerts when component mounts and check backend status
  useEffect(() => {
    checkBackendStatus();
    fetchAlerts();
    
    // Check backend status every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <SignedIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Inventory Management</h1>
          <p className="text-gray-300">
            Upload your inventory data for analysis and predictions
          </p>
        </div>

      {/* Backend Status Indicator */}
      <div className="mb-6">
        <div className={`p-4 rounded-md ${
          backendStatus === "online" ? "bg-green-900 border border-green-700" : 
          backendStatus === "offline" ? "bg-red-900 border border-red-700" : 
          "bg-yellow-900 border border-yellow-700"
        }`}>
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-5 w-5 ${
              backendStatus === "online" ? "text-green-400" : 
              backendStatus === "offline" ? "text-red-400" : 
              "text-yellow-400"
            }`}>
              {backendStatus === "checking" ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : backendStatus === "online" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${
                backendStatus === "online" ? "text-green-200" : 
                backendStatus === "offline" ? "text-red-200" : 
                "text-yellow-200"
              }`}>
                {backendStatus === "online" ? "Prediction Service Online" : 
                 backendStatus === "offline" ? "Prediction Service Offline" : 
                 "Checking Prediction Service Status"}
              </h3>
              <div className={`mt-2 text-sm ${
                backendStatus === "online" ? "text-green-100" : 
                backendStatus === "offline" ? "text-red-100" : 
                "text-yellow-100"
              }`}>
                <p>
                  {backendStatus === "online" ? "The prediction service is running and ready to process your data." : 
                   backendStatus === "offline" ? "The prediction service is not running. Please start the backend server." : 
                   "Checking if the prediction service is available..."}
                </p>
              </div>
            </div>
          </div>
          {backendStatus === "offline" && (
            <div className="mt-4">
              <button
                onClick={checkBackendStatus}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Retry Connection
              </button>
              <p className="mt-2 text-sm text-red-100">
                To start the backend server, run the start.bat file in the backend directory.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Inventory Data</h2>
          
          <div className="space-y-6">
            {/* Historical Data Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Historical Sales Data (CSV)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="historical-file-upload"
                      className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="historical-file-upload"
                        name="historical-file-upload"
                        type="file"
                        className="sr-only"
                        accept=".csv"
                        onChange={handleHistoricalFileChange}
                        ref={historicalFileRef}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    CSV file up to 10MB
                  </p>
                  {historicalFile && (
                    <p className="text-sm text-gray-300 mt-2">
                      Selected: {historicalFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Current Inventory Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Inventory Data (CSV)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="current-file-upload"
                      className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="current-file-upload"
                        name="current-file-upload"
                        type="file"
                        className="sr-only"
                        accept=".csv"
                        onChange={handleCurrentFileChange}
                        ref={currentFileRef}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    CSV file up to 10MB
                  </p>
                  {currentFile && (
                    <p className="text-sm text-gray-300 mt-2">
                      Selected: {currentFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading || !historicalFile || !currentFile || backendStatus !== "online"}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload Data"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset
              </button>
            </div>

            {/* Status Messages */}
            {uploadStatus && (
              <div className="p-4 bg-green-900 border border-green-700 rounded-md">
                <p className="text-green-200">{uploadStatus}</p>
              </div>
            )}

            {uploadError && (
              <div className="p-4 bg-red-900 border border-red-700 rounded-md">
                <p className="text-red-200">{uploadError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Data Format Guide</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Historical Sales Data</h3>
              <p className="text-gray-300 mb-3">
                Your CSV file should include the following columns:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li><span className="font-medium">date</span> - Date of sale (YYYY-MM-DD format)</li>
                <li><span className="font-medium">product_id</span> - Unique identifier for each product</li>
                <li><span className="font-medium">product_name</span> - Name of the product</li>
                <li><span className="font-medium">quantity_sold</span> - Number of units sold</li>
                <li><span className="font-medium">region</span> - Sales region</li>
                <li><span className="font-medium">season</span> - Season (Summer, Monsoon, Autumn, Winter)</li>
                <li><span className="font-medium">month</span> - Month name</li>
                <li><span className="font-medium">holiday</span> - Holiday indicator (Yes/No)</li>
              </ul>
              <div className="mt-3 bg-gray-900 p-3 rounded">
                <pre className="text-sm text-green-400">
{`date,product_id,product_name,quantity_sold,region,season,month,holiday
2023-01-15,1001,Wireless Headphones,5,North,Summer,January,No
2023-01-16,1001,Wireless Headphones,3,North,Summer,January,No`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">Current Inventory Data</h3>
              <p className="text-gray-300 mb-3">
                Your CSV file should include the following columns:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li><span className="font-medium">product_id</span> - Unique identifier for each product</li>
                <li><span className="font-medium">product_name</span> - Name of the product</li>
                <li><span className="font-medium">current_stock</span> - Current quantity in inventory</li>
              </ul>
              <div className="mt-3 bg-gray-900 p-3 rounded">
                <pre className="text-sm text-green-400">
{`product_id,product_name,current_stock
1001,Wireless Headphones,45
1002,Smartphone Charger,22`}
                </pre>
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
                  <h3 className="text-sm font-medium text-blue-200">Important</h3>
                  <div className="mt-2 text-sm text-blue-100">
                    <p>
                      After uploading your data, the system will process it using the Prophet model and generate restock predictions. 
                      You can view the results in the <Link href="/dashboard" className="text-indigo-300 hover:text-indigo-200 underline">Dashboard</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restock Alerts Section */}
      <div className="mt-8 bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Restock Alerts</h2>
          <button 
            onClick={fetchAlerts}
            disabled={isLoadingAlerts || backendStatus !== "online"}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoadingAlerts ? "Refreshing..." : "Refresh Alerts"}
          </button>
        </div>
        
        {isLoadingAlerts ? (
          <div className="flex justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : alerts.length > 0 ? (
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
                    Stock Out Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Suggested Restock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {alerts.map((alert, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{alert.product_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{alert.current_stock} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-red-400">{alert.stock_out_date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{alert.suggested_restock} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Restock Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-300">No restock alerts</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload inventory data to generate restock predictions.
            </p>
          </div>
        )}
      </div>
      </SignedIn>
      <SignedOut>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">You need to be signed in to manage inventory.</p>
          <SignInButton>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}