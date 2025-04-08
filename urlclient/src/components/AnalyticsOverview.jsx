import React from 'react';

const AnalyticsOverview = ({ dashboard }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Links</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboard.totalLinks}</dd>
        </div>
      </div>
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Clicks</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboard.totalClicks}</dd>
        </div>
      </div>
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Click-through Rate</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {dashboard.totalLinks > 0 
              ? `${(dashboard.totalClicks / dashboard.totalLinks).toFixed(2)}/link` 
              : '0/link'}
          </dd>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;