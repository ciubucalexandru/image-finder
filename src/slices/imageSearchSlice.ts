import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../store/hook';
import { getPhotoByQuery } from '../thunks/imageSearchThunk';

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

// This code will be used as alternative in case the api is not available on testing
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

export const imageSearchSlice = createAppSlice({
  name: 'imageSearch',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<any>) => {
      state.image = action.payload;
      state.isImageLoading = false;
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
  extraReducers: (builder) => {
    builder.addCase(getPhotoByQuery.pending, (state) => {
      state.isImageLoading = true;
    });
    builder.addCase(getPhotoByQuery.fulfilled, (state, action) => {
      state.isImageLoading = false;
      state.image = action.payload;
    });
    builder.addCase(getPhotoByQuery.rejected, (state, action) => {
      state.isImageLoading = false;
      console.log(action.payload);
    });
  },
});

export const { setImage, setIsImageLoading, setIsSearchModalVisible, setSearchTopic } =
  imageSearchSlice.actions;

export default imageSearchSlice.reducer;
