import React, { useEffect, useState } from "react";

function List() {
  //fetch pending list from backend
  //map it to li
  //on clikcing should redirect to the textbox component of respective club
  const [list, updateList] = useState([]);
  useEffect(() => {
    const pendingList = async () => {
      const response = await fetch("/adminPage", {
        method: "GET",
        header: { "Content-type": "application/json" },
        body: JSON.stringify({ userId: id }),
      });
      console.log(response);
      updateList(response.json());
    };
    pendingList();
  }, []);
  return <ul></ul>;
}
