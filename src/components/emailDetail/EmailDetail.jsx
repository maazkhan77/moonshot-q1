import React from "react";

const EmailDetail = ({ email }) => {
  return (
    <div>
      <h2>{email.subject}</h2>
      <p>
        <strong>From:</strong> {email.from.name} ({email.from.email})
      </p>
      <p>
        <strong>Date:</strong> {new Date(email.date).toLocaleString()}
      </p>
      <p>{email.short_description}</p>
    </div>
  );
};

export default EmailDetail;
