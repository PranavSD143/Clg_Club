import React from "react";
import "../css/CarouselCard.css";

export default function CardDescription(props) {
  const redirect = () => (window.location.href = props.url); // Later add the event link along with clg website link
  return (
    <div className="nitte-card">
      <p>
        NMIT offers technical and cultural clubs, fostering innovation,
        creativity, and enriched student life through workshops, competitions,
        and events.
      </p>
      <div className="nitte-button">
        <button type="button" onClick={redirect}>
          Learn More
        </button>
      </div>
    </div>
  );
}
