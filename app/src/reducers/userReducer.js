import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;