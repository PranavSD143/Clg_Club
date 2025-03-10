import React, { useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../css/ClubPage.css";

const ClubPage = () => {
  useEffect(() => {
    // Load particles.js
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      window.particlesJS("dynamic-effects", {
        particles: {
          number: { value: 90, density: { enable: true, value_area: 800 } },
          color: {
            value: [
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffcc00",
              "#ff00ff",
              "#00ffff",
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
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <header className="unique-hero">
        <div id="dynamic-effects"></div>
        <div className="dim-overlay"></div>
        <div className="primary-content">
          <h1>Welcome to the NMIT Coding Club</h1>
          <p>Empowering students with technology and innovation</p>
          <button className="call-to-action">Join Now</button>
        </div>
      </header>

      {/* About Section */}
      <section className="insight-section">
        <h2 className="shiny-heading">About Us</h2>
        <p>
          The NMIT Coding Club is a student-led initiative dedicated to
          fostering a culture of learning, collaboration, and innovation. Join
          us to explore coding, hackathons, and real-world tech projects.
        </p>
      </section>

      {/* Events Section */}
      <section className="gatherings">
        <h2 className="shiny-heading">Upcoming Events</h2>

        <div className="gathering-container">
          <div className="highlight-box">
            <img src="ss.png" alt="Hackathon 2025" />
            <h3>Hackathon 2025</h3>
            <p>Date: March 20, 2025 | Venue: NMIT Auditorium</p>
            <button className="discover-btn">Register</button>
          </div>

          <div className="highlight-box">
            <img src="cs.jpg" alt="AI & ML Bootcamp" />
            <h3>AI & ML Bootcamp</h3>
            <p>Date: April 5, 2025 | Venue: Lab 101</p>
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

      {/* Footer */}
      <footer className="bottom-section">
        <div className="icon-links">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
        <p>© 2025 NMIT Coding Club. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClubPage;
