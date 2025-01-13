import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    matricResult: '',
    matricProvisional: '',
    interResult: '',
    interProvisional: '',
    interAdmitCard: '',
    interRegistrationCard: '',
    aadharCard: '',
    fatherAadharCard: '',
    motherAadharCard: '',
    casteCard: '',
    incomeCard: '',
    residenceCard: '',
    photo: '',
    CLC: '',
    TC: '',
    migration: '',
    univCard: '',
    univRankCard: '',
    signature:''
};

const documentUploadSlice = createSlice({
  name: 'documentUpload',
  initialState,
  reducers: {
    saveDocumentUpload: (state, action) => {
      // Update the bank details
      Object.assign(state, action.payload);
    },
    resetDocumentUpload: (state) => {
      // Reset to initial state
      Object.assign(state, initialState);
    },
  },
});

export const { saveDocumentUpload, resetDocumentUpload } = documentUploadSlice.actions;
export default documentUploadSlice.reducer;


