import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/Carousel.css";
import CardDescription from "./CardDescription";
import EventList from "../Event_links";

export default function MyCarousel() {
  return (
    <div
      style={{ position: "relative", maxHeight: "100vh", minHeight: "50vh" }}>
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}>
        <div>
          <img src="./images/img.jpg" alt="img 1" className="responsive" />
          <CardDescription url="https://www.nmit.ac.in" />
        </div>
        <div>
          <img src="./images/img3.jpg" alt="img 2" className="responsive" />
          <CardDescription />
        </div>
        <div>
          <img src="./images/img2.jpg" alt="img 3" className="responsive" />
          <CardDescription />
        </div>
      </Carousel>
    </div>
  );
}
