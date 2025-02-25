import React, { useState } from "react";
import TextBox from "../components/textbox";
import Form from "../components/form";

function ClubCreation() {
  const [success, change] = useState({
    status: false,
  });
  const handleSuccess = (data) =>
    change({
      status: true,
      id: data,
    });
  return !success.status ? (
    <Form onSuccess={handleSuccess} />
  ) : (
    <TextBox register={success.id} />
  );
}

export default ClubCreation;
