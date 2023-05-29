import  React, { Component }  from "react";

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import loadMore from './PixabayAPI';
import Loader from "./Loader/Loader";

import "../styles.css";

class App extends Component {
  state = {
    images: [],
    
    page: 1,
    searchQuery: "",    

    showModal: false,
    modalImage: '',

    showButton: false,

    isLoading: false,

    totalHits: 1
  };

  openModal = (largeImageURL) => {
    this.setState({ showModal: true, webformatURL: largeImageURL});
  }

  toggleModal = () => {
    this.setState({
      modalImage: '',
      showModal: false,
    });
  }

  handleFormSubmit = (searchQuery) => {
    if (searchQuery.trim() === "") {
      // Викинути помилку або зробити відповідну обробку
      console.error("Пошуковий запит не може бути пустим");
      return;
    }
  
    this.setState({ searchQuery, page: 1, images: [], showButton: true });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  fetchImages = () => {
    const { page, searchQuery } = this.state;
    const API_KEY = "35073531-a3301b6130ef0984d8d454ab2";
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&per_page=12&page=${page}`;
    this.setState({ isLoading: true });
  
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          
          totalHits: data.totalHits
          
        }));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleLoadMore = () => {
    if (this.setState((prevState) => ({ page: prevState.page + 1 }))) {
      // this.setState({ isLoading: false });
    };
  };

  loadMoreImages = () => {
    const { searchQuery, page, images, totalHits } = this.state;
    const nextPage = page + 1;

    if (images.length >= totalHits) {

    // console.log("Зображень більше немає");
    this.setState({ isLoading: false });
   

    return;
  }

    this.setState({ isLoading: true });
  
    loadMore(searchQuery, nextPage)
    .then((newImages) => {
      if (newImages.length > 0) {
        this.setState((prevState) => ({
          images: [...prevState.images, ...newImages],
          page: prevState.page + 1,
        }));
      } else {
        this.setState({ showButton: false });
        console.log("Зображень більше немає");
      }
    })
    .finally(() => {
      this.setState({ isLoading: false });
    });
};
  

render() {
  const { images, isLoading, totalHits, page } = this.state;
  // const noMoreImages = images.length >= totalHits && totalHits > 0;

  return (
    <div className="App">
      <Searchbar onSubmit={this.handleFormSubmit} />
      <ImageGallery images={images} openModal={this.openModal} />

      {totalHits / 12 > page && (
        <Button onButtonClick={this.loadMoreImages} />
      )}

      {isLoading && <Loader />}
    </div>
  );
}
}

export default App