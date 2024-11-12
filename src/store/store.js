import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Named import for redux-thunk
import userEventReducer from './userEventSlice'; // Your slice reducer

const store = configureStore({
  reducer: {
    userEvent: userEventReducer, // Use the userEvent reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add redux-thunk to middleware
});

export default store;
