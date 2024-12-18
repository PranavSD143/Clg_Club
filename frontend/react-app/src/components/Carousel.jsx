import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const MyCarousel = () => {
  return (
    <Carousel>
      <div>
        <img src="https://via.placeholder.com/800x400/6c8e77/ffffff?text=Image+1" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/800x400/77aaff/ffffff?text=Image+2" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/800x400/ff8f8f/ffffff?text=Image+3" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default MyCarousel;
