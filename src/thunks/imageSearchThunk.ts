import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clientId, UNSPLASH_ROOT } from '../utils/constants';
import { setSearchTopic } from '../slices/imageSearchSlice';

export const getPhotoByQuery = createAsyncThunk<
  any,
  { query: string },
  {
    rejectValue: any;
  }
>('imageSearch/getImageByQuery', async ({ query }, thunkApi) => {
  try {
    thunkApi.dispatch(setSearchTopic(query));

    const { data } = await axios.get(
      `${UNSPLASH_ROOT}/photos/random?query=${query}&client_id=${clientId}&per_page=1`,
    );

    thunkApi.fulfillWithValue(data);
    return data;
  } catch (error) {
    thunkApi.rejectWithValue(error as any);
  }
});
