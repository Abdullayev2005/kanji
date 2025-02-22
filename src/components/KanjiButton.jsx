import React from "react";

const KanjiButton = ({ kanji, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 flex items-center justify-center rounded-xl shadow-md text-2xl font-bold transition ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-700 text-white "
      }`}
    >
      {kanji}
    </button>
  );
};

export default KanjiButton;
