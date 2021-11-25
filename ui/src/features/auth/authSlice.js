import { createSlice } from "@reduxjs/toolkit";

import auth0Client from "./auth0";

const initialState = {
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticationSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false
    },
    logOut(state,action){
      state.isAuthenticated = false
      state.loading = false
    }
  },
});

//TODO: need to think about error handling for all these thunks

export const loginThunk = async (dispatch, getState) => {
  const auth0 = await auth0Client;
  await auth0.loginWithRedirect({
    redirect_uri: "http://localhost:3000/auth",
  });
  //logged in. you can get the user profile like this:
};

const { actions } = authSlice;

export const onloadThunk = async (dispatch,getState) =>{
  const auth0 = await auth0Client;
  const isAuthenticated = await auth0.isAuthenticated();
  if (isAuthenticated) {
    dispatch(actions.authenticationSuccess());
  }
  else {
    dispatch(actions.logOut())
  }
}

export const handleRedirectThunk = (payload) => async (dispatch, getState) => {
  const auth0 = await auth0Client;
  
  await auth0.handleRedirectCallback();
  const isAuthenticated = await auth0.isAuthenticated();
  if (isAuthenticated) {
    dispatch(actions.authenticationSuccess());
  }
  console.log(getState());
};

export const logoutThunk = async (dispatch, getState) => {
  const auth0 = await auth0Client;

  await auth0.logout({
    returnTo: "http://localhost:3000/login",
  });
};

export default authSlice.reducer;
