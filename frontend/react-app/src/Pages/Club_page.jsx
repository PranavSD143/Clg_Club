import React, { useEffect, useState } from "react";
import "../css/ClubPage.css";
import { useParams } from "react-router-dom";

const ClubPage = () => {
  const [data, change] = useState({});
  const { id } = useParams();
  useEffect(() => {
    // Load particles.js
    async function details() {
      try {
        const response = await fetch(`http://localhost:5000/club/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        change(result);
      } catch (error) {
        console.log("Fucked up");
      }
    }
    details();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      window.particlesJS("dynamic-effects", {
        particles: {
          number: { value: 90, density: { enable: true, value_area: 800 } },
          color: {
            value: [
              "#282e95",
              "#282e95",
              "#282e95",
              "#282e95",
              "#282e95",
              "#282e95",
            ],
          },
          shape: { type: "circle" },
          opacity: { value: 1, random: true },
          size: {
            value: 6,
            random: true,
            anim: { enable: true, speed: 3, size_min: 2, sync: false },
          },
          move: {
            enable: true,
            speed: 2.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
          },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
      });
    };
    document.body.appendChild(script);
  }, [id]);

  return (
    <div>
      {/* Hero Section */}
      <header className="unique-hero">
        <div id="dynamic-effects"></div>
        <div className="dim-overlay"></div>
        <div className="primary-content">
          <h1>Welcome to {data.club_name}</h1>
          <p>Empowering students with technology and innovation</p>
          <button className="call-to-action">Join Now</button>
        </div>
      </header>

      {/* About Section */}
      <section className="insight-section">
        <h2 className="shiny-heading">About Us</h2>
        <p>{data.club_info}</p>
      </section>

      {/* Events Section */}
      <section className="gatherings">
        <h2 className="shiny-heading">Upcoming Events</h2>

        <div className="gathering-container">
          <div className="highlight-box">
            <h3>Hackathon 2025</h3>
            <p>
              Date: March 20, 2025 <br></br> Venue: NMIT Auditorium
            </p>
            <button className="discover-btn">Register</button>
          </div>

          <div className="highlight-box">
            <h3>AI & ML Bootcamp</h3>
            <p>
              Date: April 5, 2025 <br></br>Venue: Lab 101
            </p>
            <button className="discover-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="advantages">
        <h2 className="shiny-heading">Why Join Us?</h2>
        <ul>
          <li style={{ listStyleType: "none" }}> Hands-on coding experience</li>
          <li style={{ listStyleType: "none" }}>
            {" "}
            Networking with industry professionals
          </li>
          <li style={{ listStyleType: "none" }}>
            {" "}
            Exclusive access to hackathons
          </li>
          <li style={{ listStyleType: "none" }}>
            {" "}
            Internship & career opportunities
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ClubPage;
