import axios from "axios";

const API_KEY = "35073531-a3301b6130ef0984d8d454ab2";

const loadMore = (searchQuery, page = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
};

export default  loadMore ;