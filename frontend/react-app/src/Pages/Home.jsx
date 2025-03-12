import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import MyCarousel from "../components/Carousel";
import Footer from "../components/Footer";
import Marquee from "react-fast-marquee";
import styles from "../css/marquee.module.css";
import Cards from "../components/Card.jsx";
import Ann from "../components/ann";

export default function Home() {
  return (
    <div>
      <MyCarousel />
      <Marquee speed={90} className={styles.marqueeContainer}>
        Sample text for testing
      </Marquee>
      <Cards />
      <Ann />
      <Footer />
    </div>
  );
}
