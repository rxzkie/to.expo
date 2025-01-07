import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  answers: Record<string, string>;
}

const initialState: TestState = {
  answers: {},
};

const testSlice = createSlice({
  name: 'test',
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

export const { setAnswer, resetTest } = testSlice.actions;

export default testSlice.reducer;
