import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/list.css";

export default function List() {
  const [list, updateList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const pendingList = async () => {
      const response = await fetch("/adminPage");
      const data = await response.json();
      updateList(data);
    };
    pendingList();
  }, []);
  const handleClick = async (entry) => {
    if (entry.status.trim().toLowerCase() == "pending") {
      console.log(entry.id);
      navigate(`/textbox/${entry.id}`);
    }
  };
  const handleEditClick = async (clubId) => {
    navigate(`/form/${clubId}`);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const newList = async () => {
      const response = await fetch("/adminPage");
      const data = await response.json();
      updateList(data);
    };
    newList();
  };
  const registerClub = () => {
    navigate("/club_creation");
  };
  console.log(list);
  return (
    <div>
      <button onClick={registerClub}>Register Club</button>
      <ul className="user-work-list">
        {list.map((entry) => (
          <li key={entry.club_name} onClick={() => handleClick(entry)}>
            <div className="pending-div">{entry.status}</div>
            <div className="pending-div">{entry.club_name}</div>
            <button onClick={() => handleEditClick(entry.id)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
