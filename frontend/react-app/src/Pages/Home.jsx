import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import MyCarousel from "../components/Carousel";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Marquee from "react-fast-marquee";
import "../css/marquee.css";
import Cards from "../components/Card.jsx";
import Ann from "../components/ann";

export default function Home() {
  return (
    <div>
      <Header />
      <MyCarousel />
      <Marquee speed={90} className="marquee-container">
        Sample text for testing
      </Marquee>
      <Cards />
      <Ann />
      <Announcement />

      <Footer />
    </div>
  );
}
