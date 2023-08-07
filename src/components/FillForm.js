import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const FillForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch form data from the server based on the form ID
    fetch(`https://vu-forms-backend.onrender.com/forms/${formId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Form data received:", data);
  
        // Check if the formData has the 'questions' property
        if (!data.questions || !Array.isArray(data.questions)) {
          console.error("Invalid form data received: Questions not found or not an array.");
          return;
        }
  
        // Update the formData with the modified questions array
        setFormData(data);
      })
      .catch((error) => console.error("Error while fetching form data:", error));
  }, [formId]);

  const handleSubmitForm = () => {
    // Create an array to store the user's answers
    const answers = [];
  
    // Iterate through the questions and gather the user's answers
    formData.questions.forEach((question) => {
      if (question.question_type === "text" || question.question_type === "textarea") {
        const input = document.querySelector(`input[name=question_${question.question_id}]`);
        if (input) {
          answers.push({ question_id: question.question_id, response: { answer: input.value } });
        }
      } else if (question.question_type === "radio") {
        const checkedRadio = document.querySelector(`input[name=question_${question.question_id}]:checked`);
        if (checkedRadio) {
          answers.push({ question_id: question.question_id, response: { answer: checkedRadio.value } });
        }
      } else if (question.question_type === "checkbox") {
        const checkboxes = document.querySelectorAll(`input[name=question_${question.question_id}]:checked`);
        const checkboxValues = Array.from(checkboxes).map((checkbox) => checkbox.value);
        answers.push({ question_id: question.question_id, response: { answer: checkboxValues } });
      }
    });
    console.log("formData: ", formData);
    // Prepare the form submission data
    const submissionData = {
      email: email,
      answers: answers,
    };
    console.log("submission data: ", submissionData);
    // Send the form submission data to the server
    fetch(`https://vu-forms-backend.onrender.com/submitForm/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => {
        if (response.ok) {
          // Form submitted successfully
          console.log("Form submitted successfully!");
          // Show a "Thank you" message or redirect to a thank you page
          // For simplicity, we'll just log the message to the console here
          console.log("Thank you for your submission.");
        } else {
          // Error submitting the form
          console.error("Error submitting the form.");
        }
      })
      .catch((error) => {
        console.error("Error while submitting form:", error);
      });
  };

  if (!formData) {
    return <div>Loading...</div>; 
  }

  return (
    <div style={styles.fillForm}>
      <h2>{formData.title}</h2>
      <p>{formData.description}</p>

      <div style={styles.emailContainer}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.emailInput}
        />
      </div>

      {formData.questions.map((question) => (
  <div key={question.question_id} style={styles.questionContainer}>
    <label>{question.question_text}</label>
    {question.question_type === "text" && (
      <input
        type="text"
        name={`question_${question.question_id}`} 
        style={styles.input}
      />
    )}
    {question.question_type === "textarea" && (
      <textarea
        name={`question_${question.question_id}`} 
        style={styles.textarea}
      />
    )}
    {question.question_type === "radio" && (
      <div>
        {question.options &&
          question.options.map((option, optionIndex) => (
            <div key={optionIndex} style={styles.radioContainer}>
              <input
                type="radio"
                name={`question_${question.question_id}`}
                value={option}
                style={styles.radioInput}
              />
              <label>{option}</label>
            </div>
          ))}
      </div>
    )}
    {question.question_type === "checkbox" && (
      <div>
        {question.options &&
          question.options.map((option, optionIndex) => (
            <div key={optionIndex} style={styles.checkboxContainer}>
              <input
                type="checkbox"
                name={`question_${question.question_id}`} 
                value={option}
                style={styles.checkboxInput}
              />
              <label>{option}</label>
            </div>
          ))}
      </div>
    )}
  </div>
))}

      <button type="button" onClick={handleSubmitForm} style={styles.submitButton}>
        Submit Form
      </button>
    </div>
  );
};

const styles = {
  fillForm: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontFamily: "Arial, sans-serif",
  },
  emailContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  emailInput: {
    flex: 1,
    padding: "5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  questionContainer: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  radioContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  radioInput: {
    marginRight: "5px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  checkboxInput: {
    marginRight: "5px",
  },
  submitButton: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default FillForm;
