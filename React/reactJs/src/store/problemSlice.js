import { createSlice } from '@reduxjs/toolkit';

const problemSlice = createSlice({
  name: 'problem',
  initialState: {
    problemId: null,
    data: null
  },
  reducers: {
    setProblemId: (state, action) => {
      state.problemId = action.payload;
    },
    setProblemData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setProblemId, setProblemData } = problemSlice.actions;
export default problemSlice.reducer;
