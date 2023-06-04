import axios from "axios";

const API_KEY = "35073531-a3301b6130ef0984d8d454ab2";

export const fetchImages = (searchQuery, page = 1) => {
  const url = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios.get(url).then((response) => response.data);
};
