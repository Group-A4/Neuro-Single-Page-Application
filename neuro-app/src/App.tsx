import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/Home';
import AllMySubjects from './pages/AllMySubjectsPage/AllMySubjects';
import ViewQuestions from './pages/ViewMaterialsPages/ViewQuestionsPage/ViewQuestions';
import ViewLessonMaterials from './pages/ViewMaterialsPages/ViewLessonMaterialsPage/ViewLessonMaterials';


import AddMaterialsLesson from './pages/AddMaterialsLessonPage/AddMaterialsLesson';
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
import EditQuizQuestion from './pages/EditQuizQuestionsPage/EditQuizQuestion';




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllMySubjects" element={<AllMySubjects />} />
        <Route path="/ViewQuestions" element={<ViewQuestions />} />
        <Route path="/ViewLessonMaterials" element={<ViewLessonMaterials />} />
        <Route path="/AddQuestion" element={<AddQuestion />} />
        <Route path="/AddMaterialsLesson" element={<AddMaterialsLesson />} />
        <Route path="/ViewQuestionAnswer" element={<ViewQuestionAnswer />} />
        <Route path="/AllQuestions" element={<AllQuestions />} />
        <Route path="/AllExams" element={<AllExams />} />
        <Route path="/CreateAnExam" element={<CreateAnExam />} />
        <Route path="/EditQuestions" element={<EditQuestions />} />
        <Route path="/ViewExamAnswers" element={<ViewExamAnswers />} />
        <Route path="/CreateExamQuestions" element={<CreateExamQuestions />} />
        <Route path="/ViewExam" element={<ViewExam />} />
        <Route path="/Exam" element={<Exam />} />
        <Route path="/EditQuizQuestion" element={<EditQuizQuestion />} />
      </Routes>
    </>
  );
}

export default App;

