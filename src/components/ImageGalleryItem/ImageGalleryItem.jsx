import React from 'react';


const ImageGalleryItem = ({ largeImageURL, openModal, webformatURL }) => {


  return (
    <li className="ImageGalleryItem-image">
      <img
        src={webformatURL}
        alt=""
        className="gallery-image"
        onClick={() => openModal(largeImageURL)}
      />
      
    </li>
  );
};

export default ImageGalleryItem;