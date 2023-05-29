import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    selectedImage: null
  };

  openModal = (image) => {
    this.setState({ showModal: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images } = this.props;
    const { showModal, selectedImage } = this.state;

    return (
      <div>
        <ul className="ImageGallery">
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              openModal={this.openModal}
            />
          ))}
        </ul>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={selectedImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default ImageGallery;