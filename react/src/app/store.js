import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import surveyReducer from "../features/surveys/surveySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  survey: surveyReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
