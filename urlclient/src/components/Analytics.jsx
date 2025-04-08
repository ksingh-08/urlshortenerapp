

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const BACKEND_URL = 'https://urlserver-c4se.onrender.com';
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Updated to match the backend route
        const response = await axios.get(`${BACKEND_URL}/api/analytics/link/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setAnalytics({
          shortCode: response.data.link.shortCode,
          longUrl: response.data.link.originalUrl,
          totalClicks: response.data.totalClicks,
          createdAt: response.data.link.createdAt,
          clicksByDate: response.data.clicksOverTime.map(item => ({
            date: item.date,
            count: item.clicks
          })),
          topReferrers: response.data.link.referrers?.map(r => ({
            referrer: r.source,
            count: r.count
          })) || [],
          topCountries: response.data.link.countries?.map(c => ({
            country: c.name,
            count: c.count
          })) || [],
          deviceData: response.data.deviceData,
          browserData: response.data.browserData
        });
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  if (loading) {
    return <div className="text-center py-6">Loading analytics data...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  if (!analytics) {
    return <div className="text-center py-6">No analytics data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Analytics for {analytics.shortCode}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Clicks</h2>
          <p className="text-3xl font-bold text-indigo-600">{analytics.totalClicks}</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Created On</h2>
          <p className="text-xl">{new Date(analytics.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Original URL</h2>
          <a href={analytics.longUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 break-all">
            {analytics.longUrl}
          </a>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Clicks by Date</h2>
        {analytics.clicksByDate && analytics.clicksByDate.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.clicksByDate}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Clicks" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500">No click data available by date</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Top Referrers</h2>
          {analytics.topReferrers && analytics.topReferrers.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {analytics.topReferrers.map((referrer, index) => (
                <li key={index} className="py-3 flex justify-between">
                  <span className="text-gray-800">{referrer.referrer || 'Direct'}</span>
                  <span className="text-gray-600">{referrer.count} clicks</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No referrer data available</p>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Top Countries</h2>
          {analytics.topCountries && analytics.topCountries.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {analytics.topCountries.map((country, index) => (
                <li key={index} className="py-3 flex justify-between">
                  <span className="text-gray-800">{country.country || 'Unknown'}</span>
                  <span className="text-gray-600">{country.count} clicks</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No country data available</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Devices</h2>
          {analytics.deviceData && analytics.deviceData.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {analytics.deviceData.map((item, index) => (
                <li key={index} className="py-3 flex justify-between">
                  <span className="text-gray-800">{item.device}</span>
                  <span className="text-gray-600">{item.count} clicks</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No device data available</p>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Browsers</h2>
          {analytics.browserData && analytics.browserData.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {analytics.browserData.map((item, index) => (
                <li key={index} className="py-3 flex justify-between">
                  <span className="text-gray-800">{item.browser}</span>
                  <span className="text-gray-600">{item.count} clicks</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No browser data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;