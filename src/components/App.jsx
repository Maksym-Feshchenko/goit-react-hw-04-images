import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import { fetchImages } from './PixabayAPI';
import Loader from "./Loader/Loader";

import "../styles.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [setShowModal] = useState(false);
  const [setModalImage] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(1);

  const openModal = (largeImageURL) => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const handleFormSubmit = (searchQuery) => {
    if (searchQuery.trim() === "") {
      console.error("Пошуковий запит не може бути пустим");
      return;
    }

    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setShowButton(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowButton(false);
      return;
    }

    setIsLoading(true);

    fetchImages(searchQuery, page)
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setTotalHits(data.totalHits);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, page]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [images]);

  useEffect(() => {
    if (images.length >= totalHits && totalHits > 0) {
      console.log("Зображень більше немає");
      setShowButton(false);
    }
  }, [images, totalHits]);

  useEffect(() => {
    if (searchQuery.trim() !== "" && images.length === 0 && !isLoading) {
      console.log("Введіть правильний запит");
    }
  }, [searchQuery, images, isLoading]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} openModal={openModal} />

      {images.length > 0 && showButton && <Button onButtonClick={handleLoadMore} />}

      {isLoading && (images.length > 0 || showButton) && <Loader />}
    </div>
  );
};

export default App;
