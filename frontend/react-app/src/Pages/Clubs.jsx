import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function Lists() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/clubs") // Fetch list of clubs from backend
      .then((res) => res.json())
      .then((data) => setList(data))
      .catch((err) => console.error("Error fetching club list:", err));
  }, []);

  return (
    <div>
      <h1>List of Clubs</h1>
      <ul>
        {list.length > 0 ? (
          list.map((club) => (
            <li key={club.id}>
              <Link to={`/club/${club.id}`}>{club.club_name}</Link>
              {/* Clickable link */}
            </li>
          ))
        ) : (
          <p>Loading clubs...</p>
        )}
      </ul>
    </div>
  );
}

export default Lists;
