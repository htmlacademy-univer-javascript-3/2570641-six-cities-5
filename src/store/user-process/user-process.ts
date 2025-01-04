import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '@/const';
import { UserProcess } from '@/types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: null,
  userToken: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

export const { setAuthorizationStatus, setUserEmail } = userProcess.actions;
