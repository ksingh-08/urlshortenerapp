// src/store/slices/analyticsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth token with Bearer format
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
};

// Get link analytics
export const getLinkAnalytics = createAsyncThunk(
  'analytics/getLinkAnalytics',
  async (linkId, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      const res = await axios.get(`${API_URL}/api/analytics/link/${linkId}`, config);
      return res.data;
    } catch (err) {
      if (err.message === 'Authentication token not found') {
        return rejectWithValue('Token not found. Please log in again.');
      }
      return rejectWithValue(
        err.response?.data?.msg || 'Error fetching analytics data'
      );
    }
  }
);

// Get dashboard analytics
export const getDashboardAnalytics = createAsyncThunk(
  'analytics/getDashboardAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      const res = await axios.get(`${API_URL}/api/analytics/dashboard`, config);
      return res.data;
    } catch (err) {
      if (err.message === 'Authentication token not found') {
        return rejectWithValue('Token not found. Please log in again.');
      }
      return rejectWithValue(
        err.response?.data?.msg || 'Error fetching analytics data'
      );
    }
  }
);

const initialState = {
  currentLinkAnalytics: null,
  dashboard: null,
  loading: false,
  error: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLinkAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLinkAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLinkAnalytics = action.payload;
        state.error = null;
      })
      .addCase(getLinkAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDashboardAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
        state.error = null;
      })
      .addCase(getDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;