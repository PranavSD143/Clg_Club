import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

function Registraton({ onSuccess, existing }) {
  const [clubName, updateName] = useState("");
  const [presidentName, updatePresidentName] = useState("");
  const [vp, updatevpName] = useState("");
  const [contactNo, updateNo] = useState("");
  const [err, change] = useState(false);
  const navigate = useNavigate();

  const change1 = (event) => updateName(event.target.value);
  const change2 = (event) => updatePresidentName(event.target.value);
  const change3 = (event) => updatevpName(event.target.value);
  const change4 = (event) => updateNo(event.target.value);

  useEffect(() => {
    async function check() {
      if (existing) {
        const clubDetails = await fetch(`/club/${existing}`);
        const data = await clubDetails.json();
        console.log(data);
        updateName(data[0].club_name);
        updatePresidentName(data[0].president);
        updatevpName(data[0].vice_president);
        updateNo(data[0].contact_no);
      }
    }
    check();
  }, [existing]);
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
    try {
      let response;
      if (!existing) {
        response = await fetch("/register-club", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(`/update/${existing}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      }
      const result = await response.json();
      if (!existing && result.status == "Success") {
        console.log("Coming uptil here successfully", result);
        onSuccess(result.id);
        alert("Club registered successfully!");
      } else if (existing && result.status == "Success") {
        console.log(result);
        alert("Updated Successfully");
        navigate(`/textbox/${result.id}`);
      } else alert("Club Name already taken");
    } catch (error) {
      console.log("Failed form submission", error);
      alert("Failed form submission");
    }
  };

  return (
    <div className="main-container">
      <div className="table-container">
        <div>
          <label className="labels">Club Name:</label>
          <input type="text" value={clubName ?? ""} onChange={change1} />
        </div>

        <div>
          <label className="labels">President:</label>
          <input type="text" value={presidentName ?? ""} onChange={change2} />
        </div>
        <div>
          <label className="labels">Vice-President:</label>
          <input type="text" value={vp ?? ""} onChange={change3} />
        </div>
        <div>
          <label className="labels">Contact No:</label>
          <input type="text" value={contactNo ?? ""} onChange={change4} />
        </div>
        <button onClick={handleSubmit}>Proceed</button>
        {err && "Fill all the fields"}
      </div>
    </div>
  );
}

export default Registraton;
