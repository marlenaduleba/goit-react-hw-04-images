import axios from "axios";

const API_KEY = '32655880-e7a49c73234a053b338665414';

const BASE_URL = `https://pixabay.com/api/`;

const SETTINGS = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (searchQuery, page) => {
  try {
    const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}${SETTINGS}`;

    const data = await axios.get(URL);
 
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const api = {
  fetchImages,
};