import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
