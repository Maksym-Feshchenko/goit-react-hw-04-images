import React, { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <ul className="ImageGallery">
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            openModal={openModal}
          />
        ))}
      </ul>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={selectedImage} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;
