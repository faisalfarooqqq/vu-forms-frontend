import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewForm = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Fetch all the forms from the server
    fetch('https://vu-forms-backend.onrender.com/forms')
      .then((response) => response.json())
      .then((data) => {
        setForms(data);
      })
      .catch((error) => console.error("Error while fetching forms:", error));
  }, []);

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    formList: {
      listStyle: 'none',
      padding: 0,
    },
    formItem: {
      marginBottom: '10px',
    },
    formLink: {
      display: 'block',
      fontSize: '18px',
      color: '#007bff',
      textDecoration: 'none',
      borderBottom: '1px solid #ccc',
      paddingBottom: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Forms List</h2>
      <ul style={styles.formList}>
        {forms.map((form) => (
          <li key={form.id} style={styles.formItem}>
            <Link to={`/responses/${form.id}`} style={styles.formLink}>
              {form.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewForm;
