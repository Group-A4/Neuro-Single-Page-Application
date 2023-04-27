import React, { useState } from "react";
import "./CSS/App.css";
import "./CSS/AdminPage.css";
import "./CSS/NavBar.css";
import Create from "./Scripts/AdminFolder/CreateAccount";
import Login from "./Scripts/LoginFolder/Login";
import Admin from "./Scripts/AdminFolder/AdminPageRender";
import { Route, Routes } from "react-router-dom";


import Home from "./Scripts/ProfessorFolder/HomePage/Home";
import UploadMaterials from "./Scripts/ProfessorFolder/UploadMaterialsPage/UploadMaterials";
import AllMyCourses from "./Scripts/ProfessorFolder/AllMyCoursesPage/AllMyCourses";
import EditCurriculum from "./Scripts/ProfessorFolder/EditCurriculumPage/EditCurriculum";
import ViewMaterials from './Scripts/ProfessorFolder/ViewMaterialsPage/ViewMaterials';
import ViewCourse from './Scripts/ProfessorFolder/ViewCoursePage/ViewCourse';
import ViewQuestions from './Scripts/ProfessorFolder/ViewQuestionsPage/ViewQuestions';
import Syllabus from './Scripts/ProfessorFolder/SyllabusPage/Syllabus';
import ViewLessonMaterials from './Scripts/ProfessorFolder/ViewLessonMaterialsPage/ViewLessonMaterials';
import AddQuestion from './Scripts/ProfessorFolder/AddQuestionPage/AddQuestion';
import AddQuestionsQuiz from './Scripts/ProfessorFolder/AddQuestionsQuizPage/AddQuestionsQuiz';
import AddMaterialsLesson from './Scripts/ProfessorFolder/AddMaterialsLessonPage/AddMaterialsLesson';
import ViewQuestionAnswer from './Scripts/ProfessorFolder/ViewQuestionAnswerPage/ViewQuestionAnswer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="Admin" element={<Admin />}></Route>
      <Route path="Professor" element={<Home />}></Route>
      <Route path="CreateAccount" element={<Create />}></Route>
      <Route path="UploadMaterials" element={<UploadMaterials />} />
      <Route path="/AllMyCourses" element={<AllMyCourses />} />
      <Route path="/EditCurriculum" element={<EditCurriculum />} />
      <Route path="/ViewMaterials" element={<ViewMaterials />} />
      <Route path="/ViewCourse" element={<ViewCourse />} />
      <Route path="/ViewQuestions" element={<ViewQuestions />} />
      <Route path="/Syllabus" element={<Syllabus />} />
      <Route path="/ViewLessonMaterials" element={<ViewLessonMaterials />} />
      <Route path="/AddQuestion" element={<AddQuestion />} />
      <Route path="/AddQuestionsQuiz" element={<AddQuestionsQuiz />} />
      <Route path="/AddMaterialsLesson" element={<AddMaterialsLesson />} />
      <Route path="/ViewQuestionAnswer" element={<ViewQuestionAnswer />} />
    </Routes>
  );
}

export default App;
