import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  semester: '',
  stream: '',
  majorPaper: '',
  mdcSubject: '',
  micSubject: '',
  extraSubject: '',
  vacSubject: '',
  secSubject: '',
};

const subjectDetailsSlice = createSlice({
  name: 'subjectDetails',
  initialState,
  reducers: {
    savesubjectDetails: (state, action) => {
      // Update the bank details
      Object.assign(state, action.payload);
    },
    resetsubjectDetails: (state) => {
      // Reset to initial state
      Object.assign(state, initialState);
    },
  },
});

export const { savesubjectDetails, resetsubjectDetails } = subjectDetailsSlice.actions;
export default subjectDetailsSlice.reducer;
