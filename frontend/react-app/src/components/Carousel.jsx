import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../css/carousel.css";

const MyCarousel = () => {
  return (
    <Carousel
      className="carousel-container"
      autoFocus={true}
      autoPlay={true}
      interval={3000}
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}>
      <div className="carousel-content">
        <img src="https://placehold.co/300x200" />
      </div>
      <div className="carousel-content">
        <img src="https://placehold.co/300x200" />
      </div>
      <div className="carousel-content">
        <img src="https://placehold.co/300x200" />
      </div>
    </Carousel>
  );
};

export default MyCarousel;
