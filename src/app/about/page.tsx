export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">About Inventory Restock Predictor</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Revolutionizing inventory management with predictive analytics and automated restocking solutions.
        </p>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-6">
          We empower businesses to optimize their inventory management through intelligent forecasting and 
          automated restocking alerts. Our solution helps companies reduce waste, minimize stockouts, and 
          improve cash flow by providing accurate predictions of when products need to be reordered.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-900 text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">Data-Driven Decisions</h3>
            <p className="mt-2 text-gray-300">
              Make informed inventory decisions based on historical data and predictive analytics.
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-900 text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">Time Savings</h3>
            <p className="mt-2 text-gray-300">
              Automate the tedious task of inventory monitoring and restock planning.
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-900 text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">Risk Reduction</h3>
            <p className="mt-2 text-gray-300">
              Minimize the risk of stockouts and overstock situations that impact profitability.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Business Benefits</h2>
          <ul className="space-y-4">
            <li className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Reduce Stockouts:</span> Prevent lost sales due to out-of-stock items
              </p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Optimize Inventory Costs:</span> Reduce carrying costs by maintaining optimal stock levels
              </p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Improve Cash Flow:</span> Free up capital by reducing excess inventory
              </p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Enhance Customer Satisfaction:</span> Ensure product availability when customers want to buy
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-900 text-indigo-400 text-xs font-bold">
                  1
                </div>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Data Collection:</span> Gather historical sales data, current inventory levels, and supplier information
              </p>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-900 text-indigo-400 text-xs font-bold">
                  2
                </div>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Analysis:</span> Apply statistical models to identify consumption patterns and trends
              </p>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-900 text-indigo-400 text-xs font-bold">
                  3
                </div>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Prediction:</span> Forecast future demand and calculate optimal restock timing
              </p>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-900 text-indigo-400 text-xs font-bold">
                  4
                </div>
              </div>
              <p className="ml-3 text-gray-300">
                <span className="font-medium text-white">Automation:</span> Send timely alerts and recommendations to procurement teams
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Solution?</h2>
        <div className="prose prose-invert max-w-none text-gray-300">
          <p>
            Unlike traditional inventory management systems that rely on static formulas or manual tracking, 
            our Inventory Restock Predictor uses advanced algorithms to continuously learn from your data and 
            adapt to changing market conditions.
          </p>
          <p>
            Our solution is designed for businesses of all sizes, from small retailers to large enterprises, 
            providing scalable and customizable features that grow with your needs. With real-time insights 
            and automated alerts, you can focus on strategic decisions while we handle the complexities of 
            inventory forecasting.
          </p>
          <p>
            Built with modern web technologies and deployed on secure cloud infrastructure, our platform 
            ensures reliability, scalability, and data protection for your business.
          </p>
        </div>
      </div>
    </div>
  );
}