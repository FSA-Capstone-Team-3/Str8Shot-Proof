import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';

const store = configureStore({
  reducer: { auth },
  middleware: [thunkMiddleware, createLogger({ collapsed: true })],
  devTools: true,
});

export default store;
export * from './auth';
