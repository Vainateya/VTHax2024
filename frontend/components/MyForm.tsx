"use client";

import React, { useState } from "react";

interface FormProps {
  onSubmit: (inputValue: string) => void;
}

const MyForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); // State to disable form after submission

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    if (inputValue.trim()) {
      onSubmit(inputValue); // Call the onSubmit function with the input value
      setIsDisabled(true); // Disable the form after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isDisabled}
      />
    </form>
  );
};

export default MyForm;
