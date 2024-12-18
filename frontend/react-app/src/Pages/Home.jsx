import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import MyCarousel from "../components/Carousel";
export default function Home() {
  return (
    <div>
      <Header />
      <MyCarousel />
      <Card />
    </div>
  );
}
