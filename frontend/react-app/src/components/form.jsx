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
        const clubDetails = await fetch(`/club/${existing}`);
        const data = await clubDetails.json();
        updateName(data[0].club_name);
        updatePresidentName(data[0].president);
        updatevpName(data[0].vice_president);
        updateNo(data[0].contact_no);
        setClubType(data[0].club_type || "Select Club Type");
      }
    }
    check();
  }, [existing]);

  const handleFileChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (
      !clubName ||
      !presidentName ||
      !vp ||
      !contactNo ||
      // !logo ||
      clubType === "Select Club Type"
    ) {
      change(true);
      return;
    }

    const formData = {
      clubName: clubName,
      presidentName: presidentName,
      vp: vp,
      contactNo: contactNo,
    };

    try {
      let response;
      if (!existing) {
        console.log(formData);
        response = await fetch("http://localhost:5000/register-club", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
      } else {
        response = await fetch(`http://localhost:5000/update/${existing}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
      }

      const result = await response.json();
      if (result.status === "Success") {
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
