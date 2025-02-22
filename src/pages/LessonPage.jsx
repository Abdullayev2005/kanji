import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import KanjiButton from "../components/KanjiButton";
import ReadingInput from "../components/ReadingInput";
import * as wanakana from "wanakana";

const LessonPage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [userInputs, setUserInputs] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);

  useEffect(() => {
    fetch("/data/kanjidata.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedLesson = data.lessons.find(
          (lesson) => lesson.id === parseInt(lessonId)
        );
        setLesson(selectedLesson);
        initializeInputs(selectedLesson.kanjis[0]);
      })
      .catch((error) => console.error("Xatolik:", error));
  }, [lessonId]);

  const initializeInputs = (kanji) => {
    const readingsArray = kanji.readings;
    setUserInputs(new Array(readingsArray.length).fill(""));
    setIsCorrect(new Array(readingsArray.length).fill(false));
  };

  const handleInputChange = (index, value) => {
    const updatedInputs = [...userInputs];
    updatedInputs[index] = value;

    const updatedCorrect = [...isCorrect];
    const normalizedValue = wanakana.toHiragana(value.trim().toLowerCase());

    if (
      !updatedInputs.some(
        (input, idx) =>
          idx !== index &&
          wanakana.toHiragana(input.trim().toLowerCase()) === normalizedValue
      )
    ) {
      updatedCorrect[index] = lesson.kanjis[currentKanjiIndex].readings.some(
        (reading) => wanakana.toHiragana(reading.toLowerCase()) === normalizedValue
      );
    } else {
      updatedCorrect[index] = false;
    }

    setUserInputs(updatedInputs);
    setIsCorrect(updatedCorrect);
  };

  const handleNextKanji = () => {
    if (currentKanjiIndex < lesson.kanjis.length - 1) {
      const nextIndex = currentKanjiIndex + 1;
      setCurrentKanjiIndex(nextIndex);
      initializeInputs(lesson.kanjis[nextIndex]);
    }
  };

  if (!lesson) return <div>Yuklanmoqda...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-">
      <Link
        to="/"
        className="self-start mb-4 text-blue-600 hover:underline"
      >
        ⬅️ Orqaga
      </Link>

      <h1 className="text-6xl font-bold mb-4">{lesson.title}</h1>

      <div className="p-8 bg-gray-900 rounded-2xl text-white shadow-lg">
        <KanjiButton kanji={lesson.kanjis[currentKanjiIndex].kanji} />

        <div className="mt-6 flex flex-col gap-4">
          {lesson.kanjis[currentKanjiIndex].readings.map((_, index) => (
            <ReadingInput
              key={index}
              value={userInputs[index]}
              onChange={(value) => handleInputChange(index, value)}
              isCorrect={isCorrect[index]}
            />
          ))}
        </div>

        <button
          onClick={handleNextKanji}
          className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl text-white"
        >
          ➡️ Keyingi
        </button>
      </div>
    </div>
  );
};

export default LessonPage;
