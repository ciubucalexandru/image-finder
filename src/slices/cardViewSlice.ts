import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Thumbnail from '../thumbnail.jpg';
import { createAppSlice } from '../store/hook';

interface CardViewSlice {
  name: string;
  surname: string;
  imageThumbnail: string;
  isCardModalVisible: boolean;
}

const initialState: CardViewSlice = {
  name: 'Some random name',
  surname: 'Some random surname',
  imageThumbnail: Thumbnail,
  isCardModalVisible: false,
};

export const cardViewSlice = createAppSlice({
  name: 'cardView',
  initialState,
  reducers: {
    setNameData: (state, action: PayloadAction<any>) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
    },
    clearNameData: (state, action: PayloadAction<void>) => {
      state.name = '';
      state.surname = '';
      state.imageThumbnail = '';
    },
    setImageThumbnail: (state, action: PayloadAction<string>) => {
      state.imageThumbnail = action.payload;
    },
    setIsCardModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isCardModalVisible = action.payload;
    },
  },
});

export const { setNameData, setImageThumbnail, setIsCardModalVisible, clearNameData } = cardViewSlice.actions;

export default cardViewSlice.reducer;
