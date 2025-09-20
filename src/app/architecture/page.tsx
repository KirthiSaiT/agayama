export default function Architecture() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Technical Architecture</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Understanding the technology stack and system design of the Inventory Restock Predictor
        </p>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">System Overview</h2>
        <p className="text-gray-300 mb-6">
          The Inventory Restock Predictor is built using modern web technologies to provide a responsive, 
          scalable, and maintainable solution for inventory management.
        </p>
        
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-white mb-2">Architecture Diagram</h3>
          <div className="overflow-x-auto">
            <pre className="text-sm text-gray-300">
{`User Interface (Next.js/React)
        ↓
    Server Actions
        ↓
  Business Logic Layer
        ↓
    Data Processing
        ↓
  Storage (In-Memory/Mock)`}
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Frontend Technologies</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">Next.js 14:</strong> React framework with App Router</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">React 18:</strong> Component-based UI library</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">TypeScript:</strong> Type-safe JavaScript development</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">Tailwind CSS:</strong> Utility-first CSS framework</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">Server Actions:</strong> Server-side functions for data processing</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Backend Technologies</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">Node.js:</strong> JavaScript runtime environment</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">Next.js API Routes:</strong> Serverless functions (in full implementation)</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">PostgreSQL/MongoDB:</strong> Data storage (in full implementation)</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
              <span className="ml-2 text-gray-300"><strong className="text-white">Redis:</strong> Caching layer (in full implementation)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Core Algorithms</h2>
        <div className="prose prose-invert max-w-none">
          <h3 className="text-white">Restock Prediction Algorithm</h3>
          <p className="text-gray-300">
            The core of the Inventory Restock Predictor is its prediction algorithm, which calculates when 
            products should be reordered based on several factors:
          </p>
          
          <pre className="bg-gray-700 p-4 rounded-md text-sm text-gray-300">
{`// Days until stockout calculation
daysUntilStockout = (currentStock - safetyStock) / averageDailySales

// Recommended restock date
recommendedRestockDate = currentDate + (daysUntilStockout - leadTimeDays)

// Recommended order quantity
recommendedOrderQuantity = averageDailySales * (leadTimeDays + bufferDays)`}
          </pre>
          
          <h3 className="text-white">Advanced Features (Future Implementation)</h3>
          <p className="text-gray-300">
            In a full implementation, the system would include more sophisticated algorithms:
          </p>
          <ul className="text-gray-300">
            <li><strong className="text-white">Time Series Analysis:</strong> Using ARIMA or Prophet models for demand forecasting</li>
            <li><strong className="text-white">Machine Learning:</strong> Training models on historical data to improve predictions</li>
            <li><strong className="text-white">Seasonal Adjustment:</strong> Accounting for seasonal variations in demand</li>
            <li><strong className="text-white">Promotional Impact:</strong> Adjusting predictions based on marketing campaigns</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Deployment Architecture</h2>
        <div className="prose prose-invert max-w-none">
          <h3 className="text-white">Development Environment</h3>
          <p className="text-gray-300">
            During development, the application runs locally using the Next.js development server with 
            hot reloading for rapid iteration.
          </p>
          
          <h3 className="text-white">Production Deployment</h3>
          <p className="text-gray-300">
            For production deployment, the application can be deployed to various platforms:
          </p>
          <ul className="text-gray-300">
            <li><strong className="text-white">Vercel:</strong> Official hosting platform for Next.js applications</li>
            <li><strong className="text-white">Docker:</strong> Containerized deployment for consistent environments</li>
            <li><strong className="text-white">Kubernetes:</strong> Orchestrated deployment for high availability</li>
            <li><strong className="text-white">Cloud Providers:</strong> AWS, Google Cloud, or Azure hosting</li>
          </ul>
          
          <h3 className="text-white">Scalability Considerations</h3>
          <p className="text-gray-300">
            The architecture is designed to scale horizontally:
          </p>
          <ul className="text-gray-300">
            <li>Serverless functions automatically scale with demand</li>
            <li>Database connections are pooled for efficient resource usage</li>
            <li>Caching layers reduce database load for frequently accessed data</li>
            <li>CDN distribution for static assets improves global performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}