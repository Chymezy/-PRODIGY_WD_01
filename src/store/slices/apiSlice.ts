import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { newsletterService } from '../../services/api/newsletter';
import { ApiError, NewsletterSubscription } from '../../types/api';

interface ApiState {
  loading: boolean;
  error: ApiError | null;
  success: boolean;
}

const initialState: ApiState = {
  loading: false,
  error: null,
  success: false,
};

export const subscribeNewsletter = createAsyncThunk<
  NewsletterSubscription,
  string,
  { rejectValue: ApiError }
>(
  'api/subscribeNewsletter',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await newsletterService.subscribe(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error as ApiError);
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    resetApiState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
      });
  },
});

export const { resetApiState } = apiSlice.actions;
export default apiSlice.reducer; 