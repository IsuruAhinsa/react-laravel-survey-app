import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  surveys: [],
  questionTypes: ['text', "select", "radio", "checkbox", "textarea"],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    CREATE_SURVEY: (state, action) => {},
  },
});

export const { CREATE_SURVEY } = surveySlice.actions;
export default surveySlice.reducer;
