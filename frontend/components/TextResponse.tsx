"use client";

import React, { useState } from "react";

interface TextComponentProps {
  text: string;
  onButtonClick: () => void;
}

const TextComponent: React.FC<TextComponentProps> = ({
  text,
  onButtonClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      style={{
        position: "relative",
        cursor: "pointer",
        padding: "5px",
        display: "inline-block",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid black",
            padding: "10px",
            zIndex: 100,
            top: "20px",
            left: "0",
          }}
        >
          <button onClick={onButtonClick}>Action</button>
        </div>
      )}
    </span>
  );
};

interface TextResponseProps {
  texts: string[];
}

const TextResponse: React.FC<TextResponseProps> = ({ texts }) => {
  const handleButtonClick = (index: number) => {
    alert(`Button clicked for text component ${index}`);
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        width: "400px",
        minHeight: "100px",
      }}
    >
      {texts.map((text, index) => (
        <TextComponent
          key={index}
          text={text}
          onButtonClick={() => handleButtonClick(index)}
        />
      ))}
    </div>
  );
};

export default TextResponse;
