import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/form.module.css";
import moonImage from "../images/Moon2011.png";

function Registration({ onSuccess, existing }) {
  const [clubName, updateName] = useState("");
  const [presidentName, updatePresidentName] = useState("");
  const [vp, updatevpName] = useState("");
  const [contactNo, updateNo] = useState("");
  const [clubType, setClubType] = useState("Select Club Type");
  const [logo, setLogo] = useState(null);
  const [err, change] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      if (existing) {
        const clubDetails = await fetch(
          `http://localhost:5000/club/${existing}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await clubDetails.json();
        console.log(data);
        updateName(data.club_name);
        updatePresidentName(data.president);
        updatevpName(data.vice_president);
        updateNo(Number(data.contact_no));
        const image = await fetch(`http://localhost:5000${data.picture}`, {
          method: "GET",
        });
        const blob = await image.blob();
        const filename = data.picture.split("/").pop();
        const file = new File([blob], filename, { type: blob.type });
        setLogo(file);
        setClubType(data.club_type || "Select Club Type");
      }
    }
    check();
  }, [existing]);

  const handleFileChange = (event) => {
    console.log(typeof event.target.files[0]);
    setLogo(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (
      !clubName ||
      !presidentName ||
      !vp ||
      !contactNo ||
      !logo ||
      clubType === "Select Club Type"
    ) {
      change(true);
      return;
    }

    const formData = new FormData();
    formData.append("clubName", clubName);
    formData.append("presidentName", presidentName);
    formData.append("vp", vp);
    formData.append("contactNo", contactNo);
    formData.append("nature", clubType);
    formData.append("logo", logo);

    try {
      let response;
      if (!existing) {
        response = await fetch("http://localhost:5000/register-club", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
      } else {
        response = await fetch(`http://localhost:5000/update/${existing}`, {
          method: "PATCH",
          body: formData,
          credentials: "include",
        });
      }

      const result = await response.json();
      if (result.status.toLowerCase() === "success") {
        if (!existing) {
          onSuccess(result.id);
          alert("Club registered successfully!");
        } else {
          alert("Updated Successfully");
          navigate(`/textbox/${result.id}`);
        }
      } else {
        alert("Club Name already taken");
      }
    } catch (error) {
      console.log("Failed form submission", error);
      alert("Failed form submission");
    }
  };

  return (
    <div
      className={styles.cosmicShell}
      style={{ backgroundImage: `url(${moonImage})` }}>
      <div className={styles.lunarPanel}>
        <h2 className={styles.solarTitle}>Register a New Club</h2>
        <label className={styles.orbitTags}>Upload Logo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.astralUpload}
          required
        />
        <div>
          <label className={styles.orbitTags}>Club Name:</label>
          <input
            type="text"
            value={clubName ?? ""}
            onChange={(e) => updateName(e.target.value)}
            className={styles.galacticField}
          />
        </div>
        <div>
          <label className={styles.orbitTags}>Club Type:</label>
          <select
            value={clubType}
            onChange={(e) => setClubType(e.target.value)}
            className={styles.galacticField}>
            <option>Select Club Type</option>
            <option>Technical</option>
            <option>Non Technical</option>
          </select>
        </div>
        <div>
          <label className={styles.orbitTags}>President:</label>
          <input
            type="text"
            value={presidentName ?? ""}
            onChange={(e) => updatePresidentName(e.target.value)}
            className={styles.galacticField}
          />
        </div>
        <div>
          <label className={styles.orbitTags}>Vice-President:</label>
          <input
            type="text"
            value={vp ?? ""}
            onChange={(e) => updatevpName(e.target.value)}
            className={styles.galacticField}
          />
        </div>
        <div>
          <label className={styles.orbitTags}>Contact No:</label>
          <input
            type="number"
            value={contactNo}
            onChange={(e) => updateNo(e.target.value)}
            minLength={10}
            maxLength={10}
            className={styles.galacticField}
          />
        </div>
        <button onClick={handleSubmit} className={styles.jupiterTrigger}>
          Proceed
        </button>
        {err && <p style={{ color: "red" }}>Fill all the fields</p>}
      </div>
    </div>
  );
}

export default Registration;
