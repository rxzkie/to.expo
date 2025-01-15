// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import miniMentalTestReducer from './slices/miniMentalTestSlice';

export const store = configureStore({
  reducer: {
    test: miniMentalTestReducer,
    // Otros reducers pueden ir aquí
  },
});

// Inferir tipos para dispatch y estado
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
