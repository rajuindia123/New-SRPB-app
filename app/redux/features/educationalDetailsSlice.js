import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  matric: {
    matricBoardName: '',
    matricPassingYear: '',
    matriRollNo: '',
    matricRollCode: '',
    matricMarks: '',
    matricPercentage: '',
    matricInstitutionCode: '',
    institutionState: '',
    institutionDistrict: '',
  },
  inter: {
    interBoardName: '',
    interPassingYear: '',
    interRollNo: '',
    interRollCode: '',
    interMarks: '',
    interPercentage: '',
    interInstitutionCode: '',
    interCLCNo: '',
    interTCNo: '',
    interCLCTCIssueDate: '',
    interMigrationNo: '',
    interMigrationIssueDate: '',
    interInstitutionState: '',
    interInstitutionDistrict: '',
  },
};

const educationalDetailsSlice = createSlice({
  name: 'educationalDetails',
  initialState,
  reducers: {
    saveMatricData: (state, action) => {
      state.matric = action.payload;
    },
    saveInterData: (state, action) => {
      state.inter = action.payload;
    },
    updateInterData: (state, action) => {
        state.inter = { ...state.inter, ...action.payload }; // Update specific fields
      },
      updateMatricData: (state, action) => {
        state.matric = { ...state.matric, ...action.payload }; // Update specific fields
      },
    resetAcademicData: (state) => {
      state.matric = initialState.matric;
      state.inter = initialState.inter;
    },
  },
});

export const { saveMatricData, saveInterData, resetAcademicData,updateInterData,updateMatricData } = educationalDetailsSlice.actions;
export default educationalDetailsSlice.reducer;
