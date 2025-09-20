export default function ApiDocs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Technical documentation for the Inventory Restock Predictor API endpoints
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-600 mb-6">
          The Inventory Restock Predictor API provides programmatic access to inventory management 
          functionality, including product data management, restock predictions, and notification services.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Base URL</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>All API endpoints are relative to: <code className="bg-blue-100 text-blue-800 px-1 rounded">https://api.inventorypredictor.com/v1</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication</h2>
        <p className="text-gray-600 mb-4">
          All API requests require authentication using an API key in the Authorization header.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Header</h3>
          <pre className="text-sm text-gray-600">
{`Authorization: Bearer YOUR_API_KEY`}
          </pre>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Rate Limits</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>API requests are limited to 1000 requests per hour per API key.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Get All Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  GET
                </span>
                <code className="ml-2 text-sm text-gray-600">/products</code>
              </div>
              <div className="text-sm text-gray-500">
                Retrieve a list of all products in the inventory
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Response</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-600 overflow-x-auto">
{`{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "currentStock": 45,
      "dailySalesAverage": 3.2,
      "leadTimeDays": 5,
      "safetyStock": 10,
      "lastRestockDate": "2025-09-15T10:30:00Z"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Predictions</h2>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Get Restock Prediction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  GET
                </span>
                <code className="ml-2 text-sm text-gray-600">/predictions/{'{productId}'}</code>
              </div>
              <div className="text-sm text-gray-500">
                Calculate restock timing for a specific product
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Response</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-600 overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "productId": 1,
    "daysUntilStockout": 11,
    "recommendedRestockDate": "2025-09-26T00:00:00Z",
    "recommendedOrderQuantity": 50,
    "confidenceScore": 0.85,
    "status": "safe"
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Send Restock Alert</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  POST
                </span>
                <code className="ml-2 text-sm text-gray-600">/notifications/restock</code>
              </div>
              <div className="text-sm text-gray-500">
                Send a restock alert to configured notification channels
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Request Body</h4>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <pre className="text-sm text-gray-600 overflow-x-auto">
{`{
  "productId": 1,
  "productName": "Wireless Headphones",
  "currentStock": 45,
  "recommendedOrderQuantity": 50,
  "recommendedRestockDate": "2025-09-26T00:00:00Z"
}`}
              </pre>
            </div>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Response</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-600 overflow-x-auto">
{`{
  "status": "success",
  "message": "Restock alert sent successfully",
  "notificationsSent": {
    "email": true,
    "sms": false,
    "slack": true
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Handling</h2>
        <p className="text-gray-600 mb-4">
          The API uses standard HTTP status codes to indicate the success or failure of requests.
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">200</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Success</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">400</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bad Request - Invalid parameters</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">401</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unauthorized - Invalid API key</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">404</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Not Found - Resource does not exist</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">429</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Too Many Requests - Rate limit exceeded</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Internal Server Error</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}