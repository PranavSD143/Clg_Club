import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify
import "../css/Card.css";

const Card = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/card-details");
        if (!response.ok) throw new Error("Failed to fetch card details");

        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCards();
  }, []);

  const handleClick = (id) => setActiveCard(id);
  const handleClose = () => setActiveCard(null);

  const getTextSnippet = (html, length) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // Sanitize input to prevent XSS
    return tempDiv.textContent.slice(0, length) + "..."; // Extract text and slice
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card-container">
      {cards.map(
        ({
          club_name,
          catchy_phrase,
          president,
          vice_president,
          cardId,
          club_info,
          picture,
        }) => {
          const isActive = activeCard === cardId;

          return (
            <div key={cardId} className={`card ${isActive ? "active" : ""}`}>
              {isActive ? (
                <div className="expanded-card-content">
                  {/* HEADER SECTION */}
                  <div className="expanded-card-header">
                    <h2 className="club-name">{club_name}</h2>
                    <img className="club-logo" src={picture} alt="Club Logo" />
                  </div>

                  {/* GRID SECTION */}
                  <div className="expanded-card-grid">
                    <div className="catchy-phrase">{catchy_phrase}</div>
                    <div
                      className={`club-info ${isActive ? "active" : ""}`}
                      dangerouslySetInnerHTML={{ __html: club_info }}></div>
                    <div className="leader-info">
                      <div className="president">President: {president}</div>
                      <div className="vice-president">
                        Vice President: {vice_president}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Default Card View */}
                  <header className="card-header">
                    <div className="club-name">{club_name}</div>
                    <img src={picture} alt="Poster image" />
                  </header>
                  <p className="invisible">{catchy_phrase}</p>
                  <p className="heads invisible">{president}</p>
                  <p className="heads invisible">{vice_president}</p>
                  {/* Display only a safe, plain-text snippet */}
                  <div className="club-info">
                    {getTextSnippet(club_info, 50)}
                  </div>
                  <button onClick={() => handleClick(cardId)}>Read More</button>
                </>
              )}
            </div>
          );
        }
      )}
      {activeCard !== null && (
        <div className="overlay" onClick={handleClose}></div>
      )}
    </div>
  );
};

export default Card;
