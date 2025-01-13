import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    admissionFee: '',
    tuitionFee:'',
    culturalTarang:'',
    library:'',
    electricityFee:'',
    identityCard:'',
    nssFee:'',
    buildingMaintainsFund:'',
    medicalFee:'',
    athleticsFund:'',
    commonRoomFund:'',
    coCurricularFee:'',
    environmentalProtectionFee:'',
    studentWelfareFee:'',
    studentUnionFee:'',
    societySubscription:'',
    magazineFund:'',
    handbook:'',
    practical:'',
    total:'',
};

const feeStructureSlice = createSlice({
  name: 'feeStructure',
  initialState,
  reducers: {
    saveFeeStructure: (state, action) => {
      // Update the bank details
      Object.assign(state, action.payload);
    },
    resetFeeStructure: (state) => {
      // Reset to initial state
      Object.assign(state, initialState);
    },
  },
});

export const { saveFeeStructure, resetFeeStructure } = feeStructureSlice.actions;
export default feeStructureSlice.reducer;
