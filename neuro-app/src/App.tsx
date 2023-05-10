import React, { useState } from "react";
import "./CSS/App.css";
import "./CSS/AdminPage.css";
import "./CSS/NavBar.css";
import "./Scripts/StudentFolder/QuestionMockExamPage/QuestionMockExamPage.css"
import Create from "./Scripts/AdminFolder/CreateAccount";
import Login from "./Scripts/LoginFolder/Login";
import Admin from "./Scripts/AdminFolder/AdminPageRender";
import Student from "./Scripts/StudentFolder/HomePage/StudentHomePage";
import HomeProfessor from "./Scripts/ProfessorFolder/HomePage/Home";
import UploadMaterials from "./Scripts/ProfessorFolder/UploadMaterialsPage/UploadMaterials";
import ResultMockExam from "./Scripts/StudentFolder/ResultMockExamPage/ResultPage";
import TakeAMockExam from "./Scripts/StudentFolder/TakeAMockExam/TakeAMockExamPage";
import Question from "./Scripts/StudentFolder/QuestionMockExamPage/QuestionMockExamPage";
import MyResults from "./Scripts/StudentFolder/MyResults/MyResultsPage";
import CodeExam from "./Scripts/StudentFolder/CodeExamPage/CodeExamPage";
import QuestionTextPage from "./Scripts/StudentFolder/QuestionTextPage/QuestionTextPage";
import ViewMyExamAnswers from "./Scripts/StudentFolder/ViewMyExamAnswersPage/ViewMyExamAnswers";
import ResultExam from "./Scripts/StudentFolder/ResultExamPage/ResultPage";
import { Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/Home';
import AllMySubjects from './pages/AllMySubjectsPage/AllMySubjects';
import ViewQuestions from './pages/ViewMaterialsPages/ViewQuestionsPage/ViewQuestions';
import ViewLesson from './pages/ViewMaterialsPages/ViewLessonMaterialsPage/ViewLesson';


import AddContent from './Scripts/ProfessorFolder/AddContentPage/AddContent';
import ViewQuestionAnswer from './pages/ViewMaterialsPages/ViewQuestionAnswerPage/ViewQuestionAnswer';
import AllQuestions from './pages/QuizQuestionsPages/AllQuestionsPage/AllQuestions';


import CreateAnExam from './pages/CreateAnExamPage/CreateAnExam';
import EditQuestions from './pages/EditQuestions/EditQuestions';
import ViewExamAnswers from './pages/ViewExamAnswers/ViewExamAnswers';
import CreateExamQuestions from './pages/CreateExamQuestions/AddQuestion'
import AllExams from './pages/AllExamsPage/AllExams';
import ViewExam from './pages/AllExamsPage/ViewExam/ViewExam';
import Exam from './pages/AllExamsPage/ExamPage/Exam'
import AddQuestion from './pages/AddQuizQuestionsPage/AddQuestion';
import Markdown from "./Scripts/ProfessorFolder/MarkdownPage/Markdown";




function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="Admin" element={<Admin />}></Route>
      <Route path="Professor" element={<HomeProfessor />}></Route>
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
      <Route path="/" element={<Home />} />
      <Route path="/AllMySubjects" element={<AllMySubjects />} />
      <Route path="/ViewQuestions" element={<ViewQuestions />} />
      <Route path="/ViewLessonMaterials" element={<ViewLesson />} />
      <Route path="/AddQuestion" element={<AddQuestion />} />
      <Route path="/AddContent" element={<AddContent />} />
      <Route path="/ViewQuestionAnswer" element={<ViewQuestionAnswer />} />
      <Route path="/AllQuestions" element={<AllQuestions />} />
      <Route path="/AllExams" element={<AllExams />} />
      <Route path="/CreateAnExam" element={<CreateAnExam />} />
      <Route path="/EditQuestions" element={<EditQuestions />} />
      <Route path="/ViewExamAnswers" element={<ViewExamAnswers />} />
      <Route path="/CreateExamQuestions" element={<CreateExamQuestions />} />
      <Route path="/ViewExam" element={<ViewExam />} />
      <Route path="/Exam" element={<Exam />} />
      <Route path="/Markdown" element={<Markdown />} />
    </Routes>
  );
}

export default App;