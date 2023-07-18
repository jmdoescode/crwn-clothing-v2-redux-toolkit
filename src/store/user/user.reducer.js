import { createSlice } from '@reduxjs/toolkit';

// import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
};

//createSlice: creates reducer and action
export const userSlice = createSlice({
  name: 'user', //name of the slice and namespaces actions & action.types as well
  initialState: INITIAL_STATE,
  reducers: { 
    setCurrentUser(state, action) { //name of the reducer function that represents the action that updates this slice of the reducer state
      state.currentUser = action.payload //even though this looks mutable, it's generating a new object so it's actually immutable
    } 
  }
})

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

// export const userReducerOld = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return { ...state, currentUser: payload };
//     default:
//       return state;
//   }
// };
