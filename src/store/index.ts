/**
 * Redux Toolkit store configuration
 * Handles UI state, sorting, filters, and modal states
 */

import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './slices/tokensSlice';
import uiReducer from './slices/uiSlice2';

const rootReducer = {
  tokens: tokensReducer,
  ui: uiReducer,
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for performance
          ignoredActions: ['tokens/updatePrice'],
        },
      }),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
