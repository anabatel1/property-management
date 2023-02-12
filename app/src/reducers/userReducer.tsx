import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface User {
  name: string;
  username: string;
  id: string;
}

const initialState: User = {
  name: '',
  username: '',
  id: ''
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<User>) {
      return action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;