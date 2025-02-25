import react, { useState } from "react";
import "../css/form.css";

function Registraton({ onSuccess }) {
  const [clubName, updateName] = useState("");
  const [presidentName, updatePresidentName] = useState("");
  const [vp, updatevpName] = useState("");
  const [contactNo, updateNo] = useState("");
  const [err, change] = useState(false);

  const change1 = (event) => updateName(event.target.value);
  const change2 = (event) => updatePresidentName(event.target.value);
  const change3 = (event) => updatevpName(event.target.value);
  const change4 = (event) => updateNo(event.target.value);
  const handleSubmit = async () => {
    const formData = {
      clubName,
      presidentName,
      vp,
      contactNo,
    };

    if (!clubName || !presidentName || !vp || !contactNo) {
      change(true);
      return;
    }

    change(false);

    try {
      const response = await fetch("/register-club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status == "Success") {
        onSuccess(result.id);
        alert("Club registered successfully!");
      } else {
        alert("Club name is taken");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to register club.");
    }
  };

  return (
    <div className="main-container">
      <div className="table-container">
        <div>
          <label className="labels">Club Name:</label>
          <input type="text" value={clubName} onChange={change1} />
        </div>

        <div>
          <label className="labels">President:</label>
          <input type="text" value={presidentName} onChange={change2} />
        </div>
        <div>
          <label className="labels">Vice-President:</label>
          <input type="text" value={vp} onChange={change3} />
        </div>
        <div>
          <label className="labels">Contact No:</label>
          <input type="text" value={contactNo} onChange={change4} />
        </div>
        <button onClick={handleSubmit}>Proceed</button>
        {err && "Fill all the fields"}
      </div>
    </div>
  );
}

export default Registraton;
