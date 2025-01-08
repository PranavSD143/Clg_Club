import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import MyCarousel from "../components/Carousel";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Marquee from "react-fast-marquee";
import "../css/marquee.css";
export default function Home() {
  return (
    <div>
      <Header />
      <MyCarousel />
      <Marquee speed={90} className="marquee-container">
        Sample text for testing
      </Marquee>
      <Card />
      <Announcement />
      <Footer />
    </div>
  );
}
