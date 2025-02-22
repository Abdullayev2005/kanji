import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("/data/kanjidata.json")
      .then((response) => response.json())
      .then((data) => {
        setLessons(data.lessons);
      })
      .catch((error) => console.error("Ma'lumot yuklashda xatolik:", error));
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 flex flex-col items-center">
      {/* Sarlavha */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
        📚 Darslar ro'yxati
      </h1>

      {/* Darslar ro'yxati */}
      <div className="w-full max-w-md sm:max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {lessons.map((lesson, index) => (
          <Link
            key={index}
            to={`/lesson/${lesson.id}`}
            className="p-4 sm:p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-gray-700 transition-transform duration-300 ease-in-out"
          >
            <h2 className="text-lg sm:text-xl font-semibold">{lesson.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
