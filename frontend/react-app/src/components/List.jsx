import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/list.module.css";
import backImage from "../images/Darkshell2012.jpg";

export default function List() {
  const [list, updateList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingList = async () => {
      const response = await fetch("http://localhost:5000/adminPage", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      updateList(data);
    };
    fetchPendingList();
  }, []);

  // const handleClick = (entry) => {
  //   if (entry.status.trim().toLowerCase() === "pending") {
  //     console.log(entry.id);
  //     navigate(`/textbox/${entry.id}`);
  //   }
  // };

  const handleEditClick = (clubId) => {
    console.log("Reaching" + clubId);
    navigate(`/form/${clubId}`);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const refreshList = async () => {
      const response = await fetch("http://localhost:5000/adminPage", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      updateList(data);
    };
    refreshList();
  };

  const registerClub = () => {
    console.log("working");
    navigate("/club_creation");
  };

  return (
    <div
      className={styles.mainContainer}
      style={{
        backgroundImage: `url(${backImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <button className={styles.customButton} onClick={registerClub}>
        Register Club
      </button>
      <ul className={styles.clubList}>
        {list.map((entry) => (
          <li key={entry.club_name} className={styles.clubItem}>
            <div className={styles.statusLabel}>{entry.status}</div>
            <div className={styles.statusLabel}>{entry.club_name}</div>
            <button
              className={styles.customButton}
              onClick={() => handleEditClick(entry.id)}>
              Edit
            </button>
            <button
              className={styles.customButton}
              onClick={() => handleDelete(entry.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
