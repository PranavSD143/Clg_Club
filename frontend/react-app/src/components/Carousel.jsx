import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../css/carousel.css";
import name from "../images/fountain.jpg";
import nmit from "../images/nmit.jpg";
import campus from "../images/campus.jpg";

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
        <img src={campus} />
      </div>
      <div className="carousel-content">
        <img src={nmit} />
      </div>
      <div className="carousel-content">
        <img src={name} />
      </div>
    </Carousel>
  );
};

export default MyCarousel;
