import React from "react";

const ReadingInput = ({ value, onChange, isCorrect }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-3 rounded-lg w-full outline-none focus:ring-2 transition-all ${
        isCorrect
          ? "border-2 border-green-400 focus:ring-green-300"
          : "border-2 border-red-400 focus:ring-red-300"
      }`}
      placeholder="O'qilishni kiriting..."
    />
  );
};

export default ReadingInput;
