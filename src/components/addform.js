import React, { useState } from "react";
import QuestionForm from "./questionform";

const AddForm = () => {
    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [questions, setQuestions] = useState([]);
  
    const handleAddQuestion = (type) => {
      const newQuestion = {
        type,
        content: "",
        label: "",
        options: type === "radio" || type === "checkbox" ? [""] : undefined,
      };
      setQuestions([...questions, newQuestion]);
    };
  
    const handleDeleteQuestion = (index) => {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    };
  
    const handleQuestionChange = (index, updatedQuestion) => {
      const newQuestions = [...questions];
      newQuestions[index] = updatedQuestion;
      setQuestions(newQuestions);
    };
  
    const handleSubmitForm = async () => {
      const formData = {
        user_id: 1, 
        title: formName,
        description: formDescription,
        questions: questions.map(({ type, content, options, ...rest }) => ({
          question_type: type,
          question_text: content,
          ...rest,
          options: options || [],
        })),
      };
      
      console.log(formData);
      try {
        const response = await fetch("https://vu-forms-backend.onrender.com/forms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Form created successfully with ID:", data.formId);
          
        } else {
          console.error("Failed to create form");
          
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      
      }
    };
  
    return (
      <div style={styles.addForm}>
        <label style={styles.label}>Form Name:</label>
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          style={styles.input}
        />
  
        <label style={styles.label}>Form Description:</label>
        <textarea
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          style={styles.textarea}
        ></textarea>
  
        <button type="button" onClick={() => handleAddQuestion("text")} style={styles.addButton}>
          Add Text Question
        </button>
        <button type="button" onClick={() => handleAddQuestion("textarea")} style={styles.addButton}>
          Add Textarea Question
        </button>
        <button type="button" onClick={() => handleAddQuestion("radio")} style={styles.addButton}>
          Add Radio Question
        </button>
        <button type="button" onClick={() => handleAddQuestion("checkbox")} style={styles.addButton}>
          Add Checkbox Question
        </button>
  
        {questions.map((question, index) => (
          <QuestionForm
            key={index}
            question={question}
            onChange={(updatedQuestion) =>
              handleQuestionChange(index, updatedQuestion)
            }
            onDelete={() => handleDeleteQuestion(index)}
          />
        ))}
  
        <button type="button" onClick={handleSubmitForm} style={styles.submitButton}>
          Submit Form
        </button>
      </div>
    );
  };
  
  export default AddForm;
  
  const styles = {
    addForm: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#f9f9f9",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "10px",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "10px",
      resize: "vertical",
    },
    addButton: {
      background: "blue",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 12px",
      marginRight: "10px",
      marginBottom: "10px",
      cursor: "pointer",
      marginRight: "10px",
    },
    submitButton: {
      background: "green",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 12px",
      cursor: "pointer",
    },
  };
