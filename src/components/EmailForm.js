import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EmailForm = () => {
  const { formId } = useParams();
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleInputChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const handleSendEmail = () => {
    // Send the recipientEmail to the server to send the email
    fetch(`https://vu-forms-backend.onrender.com/emailForm/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipientEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Email sent successfully to ${data.recipientEmail}`);
        
      })
      .catch((error) => console.error('Error while sending email:', error));
  };

  return (
    <div style={styles.container}>
      <h2>Email Form</h2>
      <div style={styles.inputContainer}>
        <label htmlFor="recipientEmail" style={styles.label}>
          Recipient's Email:
        </label>
        <input
          type="email"
          id="recipientEmail"
          value={recipientEmail}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>
      <button style={styles.sendButton} onClick={handleSendEmail}>
        Send Email
      </button>
    </div>
  );
};

export default EmailForm;

// Inline styles object
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  sendButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
