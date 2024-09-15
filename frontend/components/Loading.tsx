"use client";

import React, { useEffect, useState } from "react";

const Loading: React.FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500); // Update dots every 500ms

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        width: "400px",
        minHeight: "50px",
      }}
    >
      {dots || "..."} {/* Show dots or just three dots at the beginning */}
    </div>
  );
};

export default Loading;
