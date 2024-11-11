import axios from 'axios';

const clientId = process.env.REACT_APP_UNSPLASH_KEY;
const UNSPLASH_ROOT = 'https://api.unsplash.com';

export const getPhotoByQuery = async (
  query: string,
  onSuccess: (result: any) => void,
  onFail: () => void,
) => {
  try {
    const { data } = await axios.get(
      `${UNSPLASH_ROOT}/photos/random?query=${query}&client_id=${clientId}&per_page=1`,
    );

    onSuccess(data.results[0]);
  } catch (error) {
    console.log(error);
    onFail();
  }
};
