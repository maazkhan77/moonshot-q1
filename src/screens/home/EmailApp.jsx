import React, { useContext, useState } from "react";
import "./emailApp.css";
import EmailList from "../../components/emailList/EmailList";
import EmailDetail from "../../components/emailDetail/EmailDetail";
import { EmailContext } from "../../context/EmailContext";

const EmailApp = () => {
  const {
    emails,
    currentPage,
    totalEmails,
    loading,
    emailsPerPage,
    setCurrentPage,
    toggleReadStatus,
  } = useContext(EmailContext);
  const [selectedEmail, setSelectedEmail] = useState(null); // State to hold the selected email
  const [filter, setFilter] = useState("all"); // State for filter

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalEmails / emailsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle email selection
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    toggleReadStatus(email.id); // Mark email as read when selected
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedEmail(null); // Reset selected email when filter changes
  };

  // Filter emails based on the selected filter
  const filteredEmails = emails.filter((email) => {
    if (filter === "all") return true;
    if (filter === "read") return email.status === "read";
    if (filter === "unread") return email.status === "unread";
    if (filter === "favorite") return email.favourite;
    return true;
  });

  console.log(emails, "emailssjhdf");

  return (
    <div className="email-container">
      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
          <option value="favorite">Favorite</option>
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Master-Slave Layout */}
      <div className="master-slave-layout">
        {/* Master: List of emails */}
        <div className="email-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <EmailList
              emails={filteredEmails}
              onEmailClick={handleEmailClick}
            />
          )}
        </div>

        {/* Slave: Email detail */}
        <div className="email-detail">
          {selectedEmail ? (
            <EmailDetail email={selectedEmail} />
          ) : (
            <p>Select an email to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailApp;
