import { configureStore } from '@reduxjs/toolkit';
import imageSearchReducer from '../slices/imageSearchSlice';
import cardViewReducer from '../slices/cardViewSlice';

export const store = configureStore({
  reducer: {
    imageSearch: imageSearchReducer,
    cardView: cardViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
