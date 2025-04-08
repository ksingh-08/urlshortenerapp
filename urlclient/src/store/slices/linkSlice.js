import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api'; // ✅ Use your configured Axios instance

// Create link
export const createLink = createAsyncThunk(
  'links/createLink',
  async (linkData, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/links', linkData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || 'Error creating link');
    }
  }
);

// Get user links
export const getLinks = createAsyncThunk(
  'links/getLinks',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/links');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || 'Error fetching links');
    }
  }
);

// Delete link
export const deleteLink = createAsyncThunk(
  'links/deleteLink',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/links/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || 'Error deleting link');
    }
  }
);

const initialState = {
  links: [],
  loading: false,
  error: null,
  success: false
};

const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    clearLinkError: (state) => {
      state.error = null;
    },
    clearLinkSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        state.links = [action.payload, ...state.links];
        state.success = true;
        state.error = null;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getLinks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.loading = false;
        state.links = state.links.filter(link => link._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearLinkError, clearLinkSuccess } = linkSlice.actions;
export default linkSlice.reducer;
