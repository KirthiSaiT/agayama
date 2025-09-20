"use client";

import { useState } from "react";

export default function Settings() {
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [slackNotifications, setSlackNotifications] = useState(false);
  
  // Threshold settings
  const [urgentThreshold, setUrgentThreshold] = useState(3);
  const [warningThreshold, setWarningThreshold] = useState(7);
  
  // Contact information
  const [emailAddress, setEmailAddress] = useState("user@company.com");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567");
  const [slackWebhook, setSlackWebhook] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database or API
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Settings</h1>
        <p className="text-gray-300">
          Configure your notification preferences and system settings
        </p>
      </div>

      <div className="bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Notification Preferences</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:px-6">
          <div className="space-y-6">
            {/* Notification Channels */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Notification Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="email-notifications"
                    name="email-notifications"
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
                  />
                  <label htmlFor="email-notifications" className="ml-3 block text-sm font-medium text-gray-300">
                    Email Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sms-notifications"
                    name="sms-notifications"
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
                  />
                  <label htmlFor="sms-notifications" className="ml-3 block text-sm font-medium text-gray-300">
                    SMS Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="slack-notifications"
                    name="slack-notifications"
                    type="checkbox"
                    checked={slackNotifications}
                    onChange={(e) => setSlackNotifications(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
                  />
                  <label htmlFor="slack-notifications" className="ml-3 block text-sm font-medium text-gray-300">
                    Slack Notifications
                  </label>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email-address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone-number" className="block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone-number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="slack-webhook" className="block text-sm font-medium text-gray-300">
                    Slack Webhook URL
                  </label>
                  <input
                    type="text"
                    id="slack-webhook"
                    value={slackWebhook}
                    onChange={(e) => setSlackWebhook(e.target.value)}
                    placeholder="https://hooks.slack.com/services/..."
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Configure incoming webhooks in your Slack workspace to receive notifications.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Threshold Settings */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Alert Thresholds</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="urgent-threshold" className="block text-sm font-medium text-gray-300">
                    Urgent Alert Threshold (days)
                  </label>
                  <input
                    type="number"
                    id="urgent-threshold"
                    value={urgentThreshold}
                    onChange={(e) => setUrgentThreshold(parseInt(e.target.value))}
                    min="1"
                    max="30"
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Send urgent alerts when stock will run out in this many days or less.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="warning-threshold" className="block text-sm font-medium text-gray-300">
                    Warning Threshold (days)
                  </label>
                  <input
                    type="number"
                    id="warning-threshold"
                    value={warningThreshold}
                    onChange={(e) => setWarningThreshold(parseInt(e.target.value))}
                    min="1"
                    max="30"
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Send warning alerts when stock will run out in this many days or less.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* System Information */}
      <div className="mt-8 bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">System Information</h2>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-400">Version</dt>
              <dd className="mt-1 text-sm text-white">1.0.0</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-400">Last Updated</dt>
              <dd className="mt-1 text-sm text-white">September 20, 2025</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-400">Database Status</dt>
              <dd className="mt-1 text-sm text-green-400">Connected</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-400">Notification Service</dt>
              <dd className="mt-1 text-sm text-green-400">Active</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}