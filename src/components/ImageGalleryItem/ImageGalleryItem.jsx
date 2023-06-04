import React from 'react';

const ImageGalleryItem = ({ largeImageURL, openModal, webformatURL }) => {
  const handleImageClick = () => {
    openModal(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem-image">
      <img
        src={webformatURL}
        alt=""
        className="gallery-image"
        onClick={handleImageClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
