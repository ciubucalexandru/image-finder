import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AddBookSlice {
  editBookData: null;
  isVisible: boolean;
  isLoading: boolean;
}

const initialState: AddBookSlice = {
  editBookData: null,
  isVisible: false,
  isLoading: false,
};

export const addBookSlice = createSlice({
  name: 'addBook',
  initialState,
  reducers: {
    setIsAddLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsAddVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setEditBookData: (state, action: PayloadAction<null>) => {
      state.editBookData = action.payload;
    },
  },
});

export const { setIsAddLoading, setIsAddVisible, setEditBookData } = addBookSlice.actions;

export default addBookSlice.reducer;
