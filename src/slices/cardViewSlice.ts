import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CardViewSlice {
  name: string;
  surname: string;
  imageThumbnail: string;
}

const initialState: CardViewSlice = {
  name: 'Some random name',
  surname: 'Some random surname',
  imageThumbnail: '../../thumbnail.jpg',
};

export const cardViewSlice = createSlice({
  name: 'cardView',
  initialState,
  reducers: {
    setNameData: (state, action: PayloadAction<any>) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
    },
    setImageThumbnail: (state, action: PayloadAction<string>) => {
      state.imageThumbnail = action.payload;
    },
  },
});

export const { setNameData, setImageThumbnail } = cardViewSlice.actions;

export default cardViewSlice.reducer;
