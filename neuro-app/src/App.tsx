import React, { useState } from "react";
import "./CSS/App.css";
import "./CSS/AdminPage.css";
import "./CSS/NavBar.css";
import "./Scripts/StudentFolder/QuestionMockExamPage/QuestionMockExamPage.css"
import Create from "./Scripts/AdminFolder/CreateAccount";
import Login from "./Scripts/LoginFolder/Login";
import Admin from "./Scripts/AdminFolder/AdminPageRender";
import Student from "./Scripts/StudentFolder/HomePage/StudentHomePage";
import { Route, Routes } from "react-router-dom";
import Home from "./Scripts/ProfessorFolder/HomePage/Home";
import UploadMaterials from "./Scripts/ProfessorFolder/UploadMaterialsPage/UploadMaterials";
import ResultMockExam from "./Scripts/StudentFolder/ResultMockExamPage/ResultPage";
import TakeAMockExam from "./Scripts/StudentFolder/TakeAMockExam/TakeAMockExamPage";
import Question from "./Scripts/StudentFolder/QuestionMockExamPage/QuestionMockExamPage";
import MyResults from "./Scripts/StudentFolder/MyResults/MyResultsPage";
import CodeExam from "./Scripts/StudentFolder/CodeExamPage/CodeExamPage";
import QuestionTextPage from "./Scripts/StudentFolder/QuestionTextPage/QuestionTextPage";
import ViewMyExamAnswers from "./Scripts/StudentFolder/ViewMyExamAnswersPage/ViewMyExamAnswers";
import ResultExam from "./Scripts/StudentFolder/ResultExamPage/ResultPage";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="Admin" element={<Admin />}></Route>
      <Route path="Professor" element={<Home />}></Route>
      <Route path="CreateAccount" element={<Create />}></Route>
      <Route path="UploadMaterials" element={<UploadMaterials />} />
      <Route path="Student" element={<Student />}></Route>
      <Route path="ResultMockExam" element={<ResultMockExam />}></Route>
      <Route path="TakeAMockExam" element={<TakeAMockExam />}></Route>
      <Route path="QuestionMockExam" element={<Question />}></Route>
      <Route path="MyResults" element={<MyResults />}></Route>
      <Route path="CodeExam" element={<CodeExam />}></Route>
      <Route path="QuestionTextPage" element={<QuestionTextPage />}> </Route>
      <Route path="ViewMyExamAnswers" element={<ViewMyExamAnswers />}> </Route>
      <Route path="ResultExam" element={<ResultExam />}></Route>
    </Routes>
  );
}

export default App;