import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';
import apiReducer from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    userPreferences: userPreferencesReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
