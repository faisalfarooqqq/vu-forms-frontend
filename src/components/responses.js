import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Responses = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  console.log(responses);
  useEffect(() => {
    // Fetch all the responses for the specific form from the server
    fetch(`https://vu-forms-backend.onrender.com/responses/${formId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        setResponses(data);
      })
      .catch((error) => console.error("Error while fetching responses:", error));
  }, [formId]);

  if (responses.length === 0) {
    return (
      <div style={styles.container}>
        <h2>No submissions for Form ID: {formId}</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Responses for Form ID: {formId}</h2>
      <ul>
        {responses.map((response) => (
          <li key={response.id} style={styles.responseItem}>
            <p><strong>Email:</strong> {response.email}</p>
            <p><strong>Submitted At:</strong> {response.submitted_at}</p>
            <ul>
              {response.answers.map((answer) => (
                <li key={answer.question_id} style={styles.answerItem}>
                  <p><strong>Question:</strong> {answer.question_text}</p>
                  <p><strong>Answer:</strong> {JSON.stringify(answer.response)}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Responses;

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  responseItem: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  answerItem: {
    marginLeft: '20px',
    marginTop: '10px',
  },
};
