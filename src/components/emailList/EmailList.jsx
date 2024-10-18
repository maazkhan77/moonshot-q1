import React from "react";

const EmailList = ({ emails, onEmailClick }) => {
  return (
    <ul>
      {emails.map((email) => (
        <li
          key={email.id}
          onClick={() => onEmailClick(email)}
          className="email-item"
        >
          {email.from.name} - {email.subject}
        </li>
      ))}
    </ul>
  );
};

export default EmailList;
