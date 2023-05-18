import React, { useState } from "react";
import "./CSS/App.css";
import "./CSS/AdminPage.css";
import "./CSS/NavBar.css";
import "./Scripts/StudentFolder/QuestionMockExamPage/QuestionMockExamPage.css"
import Create from "./Scripts/AdminFolder/CreateAccount";
import Login from "./Scripts/LoginFolder/Login";
import Admin from "./Scripts/AdminFolder/AdminPageRender";
import Student from "./Scripts/StudentFolder/HomePage/StudentHomePage";
import ResultMockExam from "./Scripts/StudentFolder/ResultMockExamPage/MockExamResultPage";
import TakeAMockExam from "./Scripts/StudentFolder/TakeAMockExam/TakeAMockExamPage";
import Question from "./Scripts/StudentFolder/QuestionMockExamPage/QuestionMockExamPage";
import MyResults from "./Scripts/StudentFolder/MyResults/MyResultsPage";
import CodeExam from "./Scripts/StudentFolder/CodeExamPage/CodeExamPage";
import QuestionText from "./Scripts/StudentFolder/QuestionTextPage/QuestionTextPage";
import ViewMyExamAnswers from "./Scripts/StudentFolder/ViewMyExamAnswersPage/ViewMyExamAnswers";
import ResultExam from "./Scripts/StudentFolder/ResultExamPage/ResultExamPage";
import { Routes, Route } from "react-router-dom";


import Home from "./Scripts/ProfessorFolder/pages/HomePage/Home";
import AllMySubjects from "./Scripts/ProfessorFolder/pages/AllMySubjectsPage/AllMySubjects";
import CreateAnExam from "./Scripts/ProfessorFolder/pages/CreateAnExamPage/CreateAnExam";
import ViewQuestions from "./Scripts/ProfessorFolder/pages/ViewMaterialsPages/ViewQuestionsPage/ViewQuestions";
import ViewLessonMaterials from "./Scripts/ProfessorFolder/pages/ViewMaterialsPages/ViewLessonMaterialsPage/ViewLessonMaterials";
import ViewQuestionAnswer from "./Scripts/ProfessorFolder/pages/ViewMaterialsPages/ViewQuestionAnswerPage/ViewQuestionAnswer";
import AllQuestions from "./Scripts/ProfessorFolder/pages/QuizQuestionsPages/AllQuestionsPage/AllQuestions";
import EditQuestions from "./Scripts/ProfessorFolder/pages/EditQuestions/EditQuestions";
import ViewExamAnswers from "./Scripts/ProfessorFolder/pages/ViewExamAnswers/ViewExamAnswers";
import CreateExamQuestions from './Scripts/ProfessorFolder/pages/CreateExamQuestions/AddQuestion'
import AllExams from "./Scripts/ProfessorFolder/pages/AllExamsPage/AllExams";
import ViewExam from "./Scripts/ProfessorFolder/pages/AllExamsPage/ViewExam/ViewExam";
import Exam from "./Scripts/ProfessorFolder/pages/AllExamsPage/ExamPage/Exam";
import AddQuestion from './Scripts/ProfessorFolder/pages/AddQuizQuestionsPage/AddQuestion';
import ViewMaterialsStudent from "./Scripts/StudentFolder/ViewMaterials/ViewMaterials";
import ViewLectures from './Scripts/StudentFolder/ViewLecturesStudent/ViewLecturesStudent';
import ProfileStudent from './Scripts/StudentFolder/ProfilePage/ProfilePage';


import AddContent from "./Scripts/ProfessorFolder/pages/AddContentPage/AddContent";
import CreateMaterial from "./Scripts/ProfessorFolder/pages/CreateMaterialPage/CreateMaterial";
import UpdateMaterial from "./Scripts/ProfessorFolder/pages/UpdateMaterialPage/UpdateMaterial";
import ViewLectureMaterials from "./Scripts/ProfessorFolder/pages/ViewLectureMaterialsPage/ViewLectureMaterials";
import ViewMaterial from "./Scripts/ProfessorFolder/pages/ViewMaterialPage/ViewMaterial";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="Admin" element={<Admin />}></Route>

      <Route path="Professor" element={<Home />}></Route>
      <Route path="CreateAccount" element={<Create />}></Route>
      
      <Route path="Student" element={<Student />}></Route>
      <Route path="QuestionTextPage/:courseExam" element={<QuestionText />}></Route>
      <Route path="ResultMockExam" element={<ResultMockExam />}></Route>
      <Route path="TakeAMockExam" element={<TakeAMockExam />}></Route>
      <Route path="QuestionMockExam/:courseId" element={<Question />}></Route>
      <Route path="MyResults" element={<MyResults />}></Route>
      <Route path="CodeExam" element={<CodeExam />}></Route>
      <Route path="ViewMyExamAnswers" element={<ViewMyExamAnswers />}> </Route>
      <Route path="ResultExam" element={<ResultExam />}></Route>
      <Route path="ViewMaterialsStudent" element={<ViewMaterialsStudent />}></Route>
      <Route path="ViewLectures/:courseId" element={<ViewLectures />} />
      <Route path="ProfileStudent" element={<ProfileStudent />} />
      <Route path="/" element={<Home />} />


      <Route path="/AllMySubjects" element={<AllMySubjects />} />
      <Route path="/ViewQuestions" element={<ViewQuestions />} />
      <Route path="/ViewLessonMaterials" element={<ViewLessonMaterials />} />
      <Route path="/AddQuestion" element={<AddQuestion />} />
      <Route path="/ViewQuestionAnswer" element={<ViewQuestionAnswer />} />
      <Route path="/AllQuestions" element={<AllQuestions />} />
      <Route path="/AllExams" element={<AllExams />} />
      <Route path="/CreateAnExam" element={<CreateAnExam />} />
      <Route path="/EditQuestions" element={<EditQuestions />} />
      <Route path="/ViewExamAnswers" element={<ViewExamAnswers />} />
      <Route path="/CreateExamQuestions" element={<CreateExamQuestions />} />
      <Route path="/ViewExam" element={<ViewExam />} />
      <Route path="/Exam" element={<Exam />} />

      <Route path="/AddContent" element={<AddContent />} />
      <Route path="/CreateMaterial" element={<CreateMaterial />} />
      <Route path="/UpdateMaterial" element={<UpdateMaterial />} />
      <Route path="/ViewLectureMaterials" element={<ViewLectureMaterials />} />
      <Route path="/ViewMaterial" element={<ViewMaterial />} />
    </Routes>
  );
}

export default App;

