import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@/store/root-reducer';
import {createAPI} from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
