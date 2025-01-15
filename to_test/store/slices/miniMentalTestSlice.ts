// store/slices/miniMentalTestSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  answers: Record<string, string>;
}

const initialState: TestState = {
  answers: {},
};

const miniMentalTestSlice = createSlice({
  name: 'miniMentalTest',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ question: string; answer: string }>) => {
      state.answers[action.payload.question] = action.payload.answer;
    },
    resetTest: (state) => {
      state.answers = {};
    },
  },
});

export const { setAnswer, resetTest } = miniMentalTestSlice.actions;
export default miniMentalTestSlice.reducer;
