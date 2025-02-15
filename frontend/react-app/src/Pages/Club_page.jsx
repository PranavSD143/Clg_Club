import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClubPage = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    fetch(`/club/${id}`)
      .then((response) => response.json())
      .then((data) => setClub(data[0]))
      .catch((error) => console.error("Error fetching club:", error));
  }, [id]);

  console.log(club);
  if (!club) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{club.club_name}</h1>
      <p>{club.club_info}</p>
    </div>
  );
};

export default ClubPage;
