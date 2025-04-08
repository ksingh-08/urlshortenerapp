import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLink, clearLinkSuccess } from '../store/slices/linkSlice';

const LinkForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customAlias: '',
    expiresAt: ''
  });
  
  const { originalUrl, customAlias, expiresAt } = formData;
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.links);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(createLink(formData));
  };
  
  // Close the form after successful link creation
  if (success) {
    dispatch(clearLinkSuccess());
    onClose();
  }
  
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Create Short Link</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="originalUrl">
            URL to Shorten *
          </label>
          <input
            type="url"
            id="originalUrl"
            name="originalUrl"
            value={originalUrl}
            onChange={onChange}
            required
            placeholder="https://example.com/long-url-to-shorten"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customAlias">
            Custom Alias (Optional)
          </label>
          <input
            type="text"
            id="customAlias"
            name="customAlias"
            value={customAlias}
            onChange={onChange}
            placeholder="my-custom-name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiresAt">
            Expiration Date (Optional)
          </label>
          <input
            type="datetime-local"
            id="expiresAt"
            name="expiresAt"
            value={expiresAt}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Creating...' : 'Create Link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;