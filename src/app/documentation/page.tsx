export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Inventory Restock Predictor Documentation</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Learn how to use our inventory management solution to predict stockouts and automate restocking.
        </p>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
        <p className="text-gray-300 mb-6">
          The Inventory Restock Predictor uses advanced algorithms to analyze your sales data and predict when 
          products will run out of stock. Based on these predictions, it calculates optimal reorder dates and 
          recommended order quantities.
        </p>
        
        <div className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4 py-1">
            <h3 className="text-lg font-medium text-white">1. Data Analysis</h3>
            <p className="text-gray-300">
              The system analyzes your current stock levels, historical sales data, and supplier lead times to 
              understand consumption patterns.
            </p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4 py-1">
            <h3 className="text-lg font-medium text-white">2. Prediction Algorithm</h3>
            <p className="text-gray-300">
              Using statistical models, the system predicts future demand and calculates when stock levels 
              will reach critical thresholds.
            </p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4 py-1">
            <h3 className="text-lg font-medium text-white">3. Automated Alerts</h3>
            <p className="text-gray-300">
              When a restock is needed, the system sends automated reminders via email or SMS to ensure 
              timely reordering.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Real-time inventory tracking</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Advanced demand forecasting</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Automated restock alerts</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Supplier lead time integration</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Customizable safety stock levels</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Reduce stockouts by up to 80%</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Minimize overstock situations</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Improve cash flow efficiency</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Automate procurement processes</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Enhance customer satisfaction</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Implementation Guide</h2>
        <div className="prose prose-invert max-w-none">
          <h3 className="text-white">Getting Started</h3>
          <p className="text-gray-300">
            To begin using the Inventory Restock Predictor, simply enter your product information on the homepage:
          </p>
          <ol className="text-gray-300">
            <li>Product name</li>
            <li>Current stock level</li>
            <li>Average daily sales</li>
            <li>Supplier lead time (in days)</li>
            <li>Safety stock level (optional)</li>
          </ol>
          
          <h3 className="text-white">Understanding the Results</h3>
          <p className="text-gray-300">
            After submitting your data, the system will provide:
          </p>
          <ul className="text-gray-300">
            <li><strong className="text-white">Days Until Stockout:</strong> How many days your current inventory will last</li>
            <li><strong className="text-white">Recommended Restock Date:</strong> When to place your next order</li>
            <li><strong className="text-white">Recommended Order Quantity:</strong> How much to order</li>
            <li><strong className="text-white">Status:</strong> Whether action is needed immediately or inventory is healthy</li>
          </ul>
          
          <h3 className="text-white">Setting Up Automated Alerts</h3>
          <p className="text-gray-300">
            For production use, you can integrate the system with your email or SMS service to receive automated 
            alerts when restocking is required. Contact our support team to set up these notifications.
          </p>
        </div>
      </div>
    </div>
  );
}