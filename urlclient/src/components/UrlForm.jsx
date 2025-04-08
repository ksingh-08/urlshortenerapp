import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUrl } from '../store/slices/urlSlice';

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) {
      setError('Please enter a URL to shorten');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await dispatch(createUrl({ longUrl, customAlias })).unwrap();
      setLongUrl('');
      setCustomAlias('');
    } catch (err) {
      setError(err.message || 'Failed to create short URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create Short URL</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700">
            Long URL
          </label>
          <input
            type="url"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/long-url-to-shorten"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700">
            Custom Alias (Optional)
          </label>
          <input
            type="text"
            id="customAlias"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="custom-alias"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Short URL'}
        </button>
      </form>
    </div>
  );
};

export default UrlForm;