import React, { createContext, useState, useEffect } from 'react';

const EmailContext = createContext();

const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmails, setTotalEmails] = useState(0);
  const [loading, setLoading] = useState(false);
  const emailsPerPage = 10; // Number of emails per page

  // Fetch emails from the API
  const fetchEmails = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://flipkart-email-mock.vercel.app/?page=${page}`
      );
      const data = await response.json();
      console.log(data)
      let emails = data.list.map((email) => ({
        ...email,
        status: "unread",
        favorite: false,
      }))
      console.log(emails)
      setEmails(emails);
      setTotalEmails(data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch emails:', error);
    }
    setLoading(false);
  };

  // Fetch emails on initial load and when the current page changes
  useEffect(() => {
    fetchEmails(currentPage);
  }, [currentPage]);

  // Toggle read/unread status
  const toggleReadStatus = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, status: email.status === 'unread' ? 'read' : 'unread' } : email
      )
    );
  };

  // Toggle favorite status
  const toggleFavoriteStatus = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, favorite: !email.favorite } : email
      )
    );
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        currentPage,
        totalEmails,
        loading,
        emailsPerPage,
        setCurrentPage,
        toggleReadStatus,
        toggleFavoriteStatus,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export { EmailContext, EmailProvider };
