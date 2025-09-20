"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function Inventory() {
  const [historicalFile, setHistoricalFile] = useState<File | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
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

  const handleUpload = async () => {
    if (!historicalFile || !currentFile) {
      setUploadError("Please select both files before uploading.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadStatus(null);

    try {
      // Create FormData object to send files
      const formData = new FormData();
      formData.append("historicalData", historicalFile);
      formData.append("currentInventory", currentFile);

      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/inventory/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Files uploaded successfully! Processing data...");
        // Reset file inputs
        setHistoricalFile(null);
        setCurrentFile(null);
        if (historicalFileRef.current) historicalFileRef.current.value = "";
        if (currentFileRef.current) currentFileRef.current.value = "";
      } else {
        const errorData = await response.json();
        setUploadError(errorData.error || "Failed to upload files.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("An error occurred while uploading files. Please try again.");
    } finally {
      setIsUploading(false);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Inventory Management</h1>
        <p className="text-gray-300">
          Upload your inventory data for analysis and predictions
        </p>
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
                disabled={isUploading || !historicalFile || !currentFile}
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
                <li><span className="font-medium">product_id</span> - Unique identifier for each product</li>
                <li><span className="font-medium">date</span> - Date of sale (YYYY-MM-DD format)</li>
                <li><span className="font-medium">quantity</span> - Number of units sold</li>
                <li><span className="font-medium">price</span> - Sale price per unit (optional)</li>
              </ul>
              <div className="mt-3 bg-gray-900 p-3 rounded">
                <pre className="text-sm text-green-400">
                  product_id,date,quantity,price
                  1001,2023-01-15,5,29.99
                  1002,2023-01-15,3,49.99
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
                <li><span className="font-medium">lead_time</span> - Supplier lead time in days</li>
                <li><span className="font-medium">safety_stock</span> - Minimum stock level (optional)</li>
              </ul>
              <div className="mt-3 bg-gray-900 p-3 rounded">
                <pre className="text-sm text-green-400">
                  product_id,product_name,current_stock,lead_time,safety_stock
                  1001,Wireless Headphones,45,5,10
                  1002,Smartphone Charger,22,3,5
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
                      After uploading your data, the system will process it and generate restock predictions. 
                      You can view the results in the <Link href="/dashboard" className="text-indigo-300 hover:text-indigo-200 underline">Dashboard</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}