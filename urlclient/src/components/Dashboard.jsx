import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLinks, deleteLink } from '../store/slices/linkSlice';
import { getDashboardAnalytics } from '../store/slices/analyticsSlice';
import Navbar from '../components/Navbar';
import LinkForm from '../components/LinkForm';
import { Line, Pie } from 'recharts';
import LinksList from './LinksList';
import LoadingSpinner from '../components/LoadingSpinner';
import AnalyticsOverview from '../components/AnalyticsOverview';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardHeader from './DashboardHeader';


// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h2 className="text-lg font-medium text-red-800">Something went wrong:</h2>
      <p className="text-red-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

const Dashboard = () => {
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const dispatch = useDispatch();
  
  const { links, loading: linksLoading } = useSelector(state => state.links);
  const { dashboard, loading: analyticsLoading } = useSelector(state => state.analytics);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getLinks());
    dispatch(getDashboardAnalytics());
  }, [dispatch]);

  const handleDeleteLink = (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      dispatch(deleteLink(id));
    }
  };

  const toggleAddLinkForm = () => {
    setShowAddLinkForm(!showAddLinkForm);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            {/* <button
              onClick={toggleAddLinkForm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showAddLinkForm ? 'Close Form' : '+ Create New Link'}
            </button> */}
            <DashboardHeader
  toggleAddLinkForm={toggleAddLinkForm}
  showAddLinkForm={showAddLinkForm}
/>
          </div>
          
          {showAddLinkForm && <LinkForm onClose={() => setShowAddLinkForm(false)} />}
          
          {/* Analytics Overview */}
          {analyticsLoading ? (
            <LoadingSpinner />
          ) : dashboard ? (
            <AnalyticsOverview dashboard={dashboard} />
          ) : null}
          
          {/* Links Table */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Links</h2>
            {linksLoading ? (
              <LoadingSpinner />
            ) : (
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                  // Reset the state that caused the error
                  dispatch(getLinks());
                }}
              >
                <LinksList 
                  links={links || []} 
                  onDelete={handleDeleteLink}
                />
              </ErrorBoundary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;