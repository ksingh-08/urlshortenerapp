import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

const BACKEND_URL = 'https://urlserver-c4se.onrender.com'; // Replace with your actual backend URL

const DashboardAnalytics = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_URL}/api/analytics/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Overall Analytics</h1>

      {/* Total Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700">Total Links</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{dashboardData.totalLinks}</p>
        </div>

        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700">Total Clicks</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{dashboardData.totalClicks}</p>
        </div>
      </div>

      {/* Top Links */}
      <div className="bg-white border rounded-lg shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Performing Links</h2>
        {dashboardData.topLinks.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {dashboardData.topLinks.map(link => (
              <li key={link.id} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{link.originalUrl}</p>
                    <p className="text-sm text-gray-500">Short Code: {link.shortCode}</p>
                  </div>
                  <span className="text-lg text-indigo-600 font-semibold">{link.clicks} clicks</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No top links found.</p>
        )}
      </div>

      {/* Recent Clicks */}
      <div className="bg-white border rounded-lg shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Clicks</h2>
        {dashboardData.recentClicks.length > 0 ? (
          <div className="overflow-auto">
            <table className="w-full table-auto text-left border">
              <thead className="bg-gray-100 text-sm text-gray-700">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Device</th>
                  <th className="p-3">Browser</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentClicks.map(click => (
                  <tr key={click.id} className="border-t text-sm">
                    <td className="p-3">{new Date(click.timestamp).toLocaleString()}</td>
                    <td className="p-3">{click.device}</td>
                    <td className="p-3">{click.browser}</td>
                    <td className="p-3">{click.country}</td>
                    <td className="p-3">{click.referrer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No recent clicks found.</p>
        )}
      </div>

      {/* Clicks Over Time */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Clicks Over Time</h2>
        {dashboardData.clicksOverTime.length > 0 ? (
          <div className="overflow-auto">
            <table className="w-full table-auto text-left border">
              <thead className="bg-gray-100 text-sm text-gray-700">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.clicksOverTime.map(item => (
                  <tr key={item.date} className="border-t text-sm">
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No click data over time.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
