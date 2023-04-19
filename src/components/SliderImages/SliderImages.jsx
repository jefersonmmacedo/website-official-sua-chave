﻿  import Carousel, { slidesToShowPlugin  } from '@brainhubeu/react-carousel';
  import {  IoArrowBack, IoArrowForward, IoCloseOutline  } from 'react-icons/io5';
  import '@brainhubeu/react-carousel/lib/style.css';
import { SliderImagesModal } from '../SliderImagesModal/SliderImagesModal';
import Modal from 'react-modal';
import { useState } from "react";
import "./sliderImages.css"
  
  
  
  export function SliderImages({images}) {
    const [isOpenModal, setIsOpenModa] = useState(false);

    function handleOpenModal(e) {
      e.preventDefault();
        setIsOpenModa(true)
      }
    
      function handleCloseModal(e) {
        e.preventDefault();
        setIsOpenModa(false)
        window.location.reload();
      }

    Modal.setAppElement('#root');

      return (
        <>
          <Carousel
          plugins={[
              'infinite',
              'centered',
              {
              resolve: slidesToShowPlugin,
              options: {
                addArrowClickHandler: true,
              numberOfSlides: 6
              }
              },
          ]}
          breakpoints={{
            950: {
              plugins: [
                  'infinite',
                  'centered',
               {
                 resolve: slidesToShowPlugin,
                 options: {
                  numberOfSlides: 4
                 }
               }]},
            800: {
              plugins: [
                  'infinite',
                  'centered',
               {
                 resolve: slidesToShowPlugin,
                 options: {
                  numberOfSlides: 3
                 }
               }]},
            650: {
              plugins: [
                  'infinite',
                  'centered',
               {
                 resolve: slidesToShowPlugin,
                 options: {
                  numberOfSlides: 2
                 }
               }]}
              }}
          >

            {images.map((image) => {
                return (
                    <img src={image.link} width="100%" height="100%" onClick={handleOpenModal} key={image.id} className="img"/>
                )
            })}

          </Carousel>

          <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-slider">
            <button type="button" className="react-modal-button-image" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <div className="itensModal">
              <div className="imagem">
                <SliderImagesModal images={images}/>
              </div>
            <h5><IoArrowBack/>Arraste as fotos para os lados<IoArrowForward/></h5>
            </div>
            </div>
            </Modal>
          </>
        )
  }