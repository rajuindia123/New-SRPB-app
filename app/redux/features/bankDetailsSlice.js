import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    bankName: '',
    acHolderName: '',
    accountNumber: '',
    ifscNo: '',
    branchName: '',
};

const bankDetailsSlice = createSlice({
  name: 'bankDetails',
  initialState,
  reducers: {
    saveBankDetails: (state, action) => {
      // Update the bank details
      Object.assign(state, action.payload);
    },
    resetBankDetails: (state) => {
      // Reset to initial state
      Object.assign(state, initialState);
    },
  },
});

export const { saveBankDetails, resetBankDetails } = bankDetailsSlice.actions;
export default bankDetailsSlice.reducer;
