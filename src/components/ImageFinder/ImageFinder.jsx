import React, { useState, useEffect } from 'react';
import { api } from 'services/api';

import { ImageGalleryList } from 'components/ImageGallery/ImageGalleryList/ImageGalleryList';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import img from '../../../src/images/not-found.jpg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './ImageFinder.module.css';

const Status = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
});

export const ImageFinder = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!search) {
      return;
    }

    setStatus(Status.PENDING);

    api
      .fetchImages(search, page)
      .then(({ data }) => {
        if (data.hits <= 0) {
          toast.info(
            `Sorry, there are no images matching your search query. Please try again.`
          );
          setStatus(Status.REJECTED);

          return;
        } else if (page === 1) {
          toast.info(`Hooray! We found "${data.total}" images`);
        }

        setImages(state => (page > 1 ? [...state, ...data.hits] : data.hits));

        setTotalImages(data.total);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [page, search]);

  const handleFormSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.box}>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && <ImageGalleryList images={images} />}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && (page * 12 < totalImages ? true : false) && (
        <Button onClick={handleLoadMoreClick} />
      )}

      {status === 'rejected' && (
        <div className={css.error}>
          <img src={img} alt="not found images" />
        </div>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
};
