import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ImageSearchSlice {
  image: any;
  searchTopic: string;
  isImageLoading: boolean;
  isSearchModalVisible: boolean;
}

const initialState: ImageSearchSlice = {
  image: null,
  searchTopic: '',
  isImageLoading: false,
  isSearchModalVisible: false,
};

// const initialState: ImageSearchSlice = {
//   image: {
//     urls: {
//       regular:
//         'https://images.unsplash.com/photo-1450802313493-940b3cfaa291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzQyNDF8MHwxfHNlYXJjaHwxfHxXYXRlcnNsaWRlfGVufDB8fHx8MTczMTMzNTQ3OHww&ixlib=rb-4.0.3&q=80&w=1080',
//     },
//   },
//   searchTopic: 'waterslide',
//   isImageLoading: false,
//   isModalVisible: true,
// };

export const imageSearchSlice = createSlice({
  name: 'imageSearch',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<any>) => {
      state.image = action.payload;
    },
    setIsImageLoading: (state, action: PayloadAction<boolean>) => {
      state.isImageLoading = action.payload;
    },
    setIsSearchModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isSearchModalVisible = action.payload;
    },
    setSearchTopic: (state, action: PayloadAction<string>) => {
      state.searchTopic = action.payload;
    },
  },
});

export const { setImage, setIsImageLoading, setIsSearchModalVisible, setSearchTopic } =
  imageSearchSlice.actions;

export default imageSearchSlice.reducer;
