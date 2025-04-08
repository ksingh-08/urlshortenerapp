import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLinks } from '../store/slices/linkSlice';
import { getDashboardAnalytics } from '../store/slices/analyticsSlice';

const DashboardHeader = ({ toggleAddLinkForm, showAddLinkForm }) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await dispatch(getLinks());
    await dispatch(getDashboardAnalytics());
    setTimeout(() => setIsRefreshing(false), 500); // Optional: Delay to show animation
  };

  return (
    <div className="flex items-center justify-between gap-x-4 mb-6">

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <i className={`fas fa-sync-alt ${isRefreshing ? 'animate-spin' : ''}`}></i>
          Refresh
        </button>
        <button
          onClick={toggleAddLinkForm}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showAddLinkForm ? 'Close Form' : '+ Create New Link'}
        </button>
      </div>
    
  );
};

export default DashboardHeader;
