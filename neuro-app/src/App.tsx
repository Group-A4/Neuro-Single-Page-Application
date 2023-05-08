import React, { useState } from "react";
import "./CSS/App.css";
import "./CSS/CreateAcc.css";
import Create from "./Scripts/AdminFolder/CreateAccount";
import Login from "./Scripts/LoginFolder/Login";
import Admin from "./Scripts/AdminFolder/AdminHomePage";
import Student from "./Scripts/StudentFolder/StudentHomePage";
import Modify from "./Scripts/AdminFolder/ModifyOptionsPage";
import DeleteAccount from "./Scripts/AdminFolder/DeleteAccount";


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
import ModifyOptionsPage from "./Scripts/AdminFolder/ModifyOptionsPage";
import EditFirstNamePage from "./Scripts/AdminFolder/EditFirstNamePage";
import EditLastNamePage from "./Scripts/AdminFolder/EditLastNamePage";
import EditRolePage from "./Scripts/AdminFolder/EditRolePage";
import EditPasswordPage from "./Scripts/AdminFolder/EditPasswordPage";
import EditUnivEmailPage from "./Scripts/AdminFolder/EditUnivEmailPage";
import EditPersEmailPage from "./Scripts/AdminFolder/EditPersEmailPage";
import ChooseAccountPage from "./Scripts/AdminFolder/ChooseAccountPage";

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
      <Route path="ModifyAccount" element={<Modify />}></Route>
      <Route path="DeleteAccount" element={<DeleteAccount />}></Route>
      <Route path="ChooseAccountPage" element={<ChooseAccountPage />}></Route>
      <Route path="EditFirstNamePage" element={<EditFirstNamePage />}></Route>
      <Route path="EditLastNamePage" element={<EditLastNamePage />}></Route>
      <Route path="EditRolePage" element={<EditRolePage />}></Route>
      <Route path="EditPasswordPage" element={<EditPasswordPage />}></Route>
      <Route path="EditUnivEmailPage" element={<EditUnivEmailPage />}></Route>
      <Route path="EditPersEmailPage" element={<EditPersEmailPage />}></Route>
      <Route path="ModifyOptionsPage" element={<ModifyOptionsPage />}></Route>
    </Routes>
  );
}

export default App;