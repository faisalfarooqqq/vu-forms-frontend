import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SendForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Fetch all the forms from the server
    fetch('https://vu-forms-backend.onrender.com/forms')
      .then((response) => response.json())
      .then((data) => {
        setForms(data);
      })
      .catch((error) => console.error('Error while fetching forms:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Forms</h2>
      <ul style={styles.list}>
        {forms.map((form) => (
          <li key={form.id} style={styles.listItem}>
            <Link to={`/emailForm/${form.id}`} style={styles.link}>
              {form.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SendForms;

// Inline styles object
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
};
