import React, { useState } from "react";

const QuestionForm = ({ question, onChange, onDelete }) => {
  const [options, setOptions] = useState(question.options || []);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
    onChange({ ...question, options: newOptions });
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    onChange({ ...question, options: newOptions });
  };

  return (
    <div style={styles.questionForm}>
      <label style={styles.label}>Question Content:</label>
      <input
        type="text"
        value={question.content}
        onChange={(e) => onChange({ ...question, content: e.target.value })}
        style={styles.input}
      />

      <label style={styles.label}>Question Label:</label>
      <input
        type="text"
        value={question.label}
        onChange={(e) => onChange({ ...question, label: e.target.value })}
        style={styles.input}
      />

      {question.type === "radio" || question.type === "checkbox" ? (
        <>
          <label style={styles.label}>Options:</label>
          {options.map((option, index) => (
            <div key={index} style={styles.optionContainer}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
                style={styles.input}
              />
              <button type="button" onClick={() => handleDeleteOption(index)}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption} style={styles.addButton}>
            Add Option
          </button>
        </>
      ) : null}

      <button type="button" onClick={onDelete} style={styles.deleteButton}>
        Delete Question
      </button>
    </div>
  );
};

export default QuestionForm;

const styles = {
  questionForm: {
    marginBottom: "20px",
    padding: "10px",
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
  optionContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  addButton: {
    background: "blue",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteButton: {
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};
