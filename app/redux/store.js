import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './features/userInfoSlice';
import educationalDetailsReducer from './features/educationalDetailsSlice';
import subjectDetailsReducer from './features/subjectDetailsSlice';
import bankDetailsReducer from './features/bankDetailsSlice';
import feeStructureReducer from './features/feeStructureSlice';
import documentUploadReducer from './features/documentUploadSlice';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    educationalDetails:educationalDetailsReducer,
    subjectDetails: subjectDetailsReducer,
    bankDetails: bankDetailsReducer,
    feeStructure: feeStructureReducer,
    documentUpload:documentUploadReducer
  },
});
