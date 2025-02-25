import React from "react";

const KanjiButton = ({ kanji, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`w-48 h-48 flex items-center justify-center rounded-2xl shadow-lg text-[8rem] font-extrabold transition ${
        isActive ? "bg-gray-200 text-black" : "bg-white text-black"
      }`}
    >
      {kanji}
    </button>
  );
};

export default KanjiButton;
