import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LessonPage from "./pages/LessonPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </Router>
  );
};

export default App;
