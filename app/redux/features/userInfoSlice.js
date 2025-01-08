import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentData: {
    candidateName: '',
    uan: '',
    motherName: '',
    fatherName: '',
    gander: '',
    emailId: '',
    whatsappNo: '',
    mobNo: '',
    stuAadharNo: '',
    motherAadhar: '',
    motherOccupation: '',
    fatherAadhar: '',
    fatherMobNo: '',
    fatherOccupation: '',
    motherMobNo: '',
    religion: '',
    identiMark: '',
    bloodGroup: '',
    corAddress: '',
    perAddress: '',
    state: '',
    district: '',
    maritalStatus: '',
    stuCategory: '',
  },
};

const userInfoSlice  = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.studentData = action.payload; // Save the entire form data
    },
    updateFormData: (state, action) => {
        state.studentData = { ...state.studentData, ...action.payload }; // Update specific fields
      },
    resetFormData: (state) => {
      state.studentData = initialState.studentData; // Reset to initial values
    },
  },
});

export const { saveFormData, resetFormData,updateFormData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
