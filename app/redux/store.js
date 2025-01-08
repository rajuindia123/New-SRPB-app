import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './features/userInfoSlice';
import educationalDetailsReducer from './features/educationalDetailsSlice';
import subjectDetailsReducer from './features/subjectDetailsSlice';
import bankDetailsReducer from './features/bankDetailsSlice';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    educationalDetails:educationalDetailsReducer,
    subjectDetails: subjectDetailsReducer,
    bankDetails: bankDetailsReducer,
  },
});
