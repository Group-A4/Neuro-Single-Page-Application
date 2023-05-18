import React, { useEffect, useState } from "react";
import Nav from "../NavBarStudent/Nav";
import styles from "./ViewMyExamAnswers.module.css";
import "../QuestionMockExamPage/QuestionMockExamPage";
import Frame from "../Components/Frame";
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Answer {
  id: number;
  idQuestion: number;
  answerText: string;
  correct: boolean;
  chosenByStudent: boolean;
}

interface QuestionMultipleChoice {
  id: number;
  idExam: number;
  idProfessor: number;
  questionText: string;
  points: number;
  studentPoints: number;
  answersQuestionResult: Answer[];
}

interface QuestionLongResponse {
  id: number;
  idExam: number;
  idProfessor: number;
  questionText: string;
  points: number;
  studentPoints: number;
  expectedResponse: string;
  studentResponse: string;
}

interface Exam {
  id: number;
  idCourse: number;
  idProfessor: number;
  title: string;
  date: string;
  timeExam: number;
  evaluationType: number;
  totalPoints: number;
  questionsMultipleChoiceResult: QuestionMultipleChoice[];
  questionsLongResponseResult: QuestionLongResponse[];
}

// const hardcodedData: Exam = {
//   id: 4,
//   idCourse: 2,
//   idProfessor: 53,
//   title: "string",
//   date: "2024-05-13T21:00:00.000+00:00",
//   timeExam: 100,
//   evaluationType: 2,
//   totalPoints: 0,
//   questionsMultipleChoiceResult: [
//     {
//       id: 19,
//       idExam: 4,
//       idProfessor: 53,
//       questionText: "string",
//       points: 10,
//       studentPoints: 0,
//       answersQuestionResult: [
//         {
//           id: 62,
//           idQuestion: 19,
//           answerText: "string",
//           correct: true,
//           chosenByStudent: false,
//         },
//       ],
//     },
//     {
//       id: 31,
//       idExam: 4,
//       idProfessor: 53,
//       questionText: "What is SOLID in Software Engineering?",
//       points: 15,
//       studentPoints: 0,
//       answersQuestionResult: [
//         {
//           id: 109,
//           idQuestion: 31,
//           answerText: "Design Pattern",
//           correct: true,
//           chosenByStudent: false,
//         },
//         {
//           id: 110,
//           idQuestion: 31,
//           answerText: "Not that important",
//           correct: false,
//           chosenByStudent: false,
//         },
//       ],
//     },
//     {
//       id: 32,
//       idExam: 4,
//       idProfessor: 53,
//       questionText: "Very Important Question",
//       points: 20,
//       studentPoints: 0,
//       answersQuestionResult: [
//         {
//           id: 111,
//           idQuestion: 32,
//           answerText: "Answer 1",
//           correct: true,
//           chosenByStudent: false,
//         },
//         {
//           id: 112,
//           idQuestion: 32,
//           answerText: "Answer 2",
//           correct: false,
//           chosenByStudent: true,
//         },
//         {
//           id: 113,
//           idQuestion: 32,
//           answerText: "Answer 3",
//           correct: true,
//           chosenByStudent: false,
//         },
//         {
//           id: 114,
//           idQuestion: 32,
//           answerText: "Answer 4",
//           correct: false,
//           chosenByStudent: false,
//         },
//       ],
//     },
//   ],
//   questionsLongResponseResult: [
//     {
//       id: 20,
//       idExam: 4,
//       idProfessor: 53,
//       questionText: "string",
//       points: 10,
//       studentPoints: 0,
//       expectedResponse: "string",
//       studentResponse: "",
//     },
//   ],
// };

const Body: React.FC<{}> = () => {
  const [exam, setExam] = useState<Exam | null>(null);
  const { examId } = useParams<{ examId: string }>();

  useEffect(() => {
    // Fetch data using the GET method
    fetch(
      `http://localhost:8192/exam/viewExamResult/idExam=${examId}/idStudent=34`
    )
      .then((response) => response.json())
      .then((data) => setExam(data))
      .catch((error) => console.error(error));
  }, [examId]);

  if (!exam) {
    return (
      <div className={styles.body}>
        <div className={styles.bodyTitle}>Loading answers...</div>
      </div>
    );
  }

return (
  <div className={styles.body}>
    <div className={styles.bodyTitle}>Here are your answers to the exam</div>

    {exam.questionsMultipleChoiceResult.map(
      (question: QuestionMultipleChoice, index: number) => (
        <div key={question.id} className={styles.questionPart}>
          <h1 className={styles.questionTitle}>
            {index + 1}/
            {exam.questionsMultipleChoiceResult.length +
              exam.questionsLongResponseResult.length}{" "}
            {question.questionText}
          </h1>

          {question.answersQuestionResult &&
            question.answersQuestionResult.length > 0 && (
              <div className={styles.questionAnswers}>
                <ul>
                  {question.answersQuestionResult.map(
                    (answer: Answer, index: number) => (
                      <li
                        key={answer.id}
                        className={`${
                          answer.correct
                            ? styles.correctAnswers
                            : answer.chosenByStudent
                            ? styles.incorrectAnswer
                            : styles.choices
                        } ${
                          answer.chosenByStudent ? styles.selectedAnswer : ""
                        }`}
                      >
                        {String.fromCharCode(97 + index)}. {answer.answerText}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          <p className={styles.yourAnswers}>
            {question.answersQuestionResult?.length > 0 &&
            question.answersQuestionResult.some(
              (answer: Answer) => answer.chosenByStudent
            ) ? (
              <>
                Your answer/s:{" "}
                {question.answersQuestionResult
                  .filter((answer: Answer) => answer.chosenByStudent)
                  .map(
                    (answer: Answer, index: number, answersArray: Answer[]) => (
                      <span
                        key={answer.id}
                        className={styles.multipleChoiceAnswer}
                      >
                        {String.fromCharCode(
                          97 + question.answersQuestionResult.indexOf(answer)
                        )}
                        ){index !== answersArray.length - 1 && ","}
                      </span>
                    )
                  )}
              </>
            ) : (
              "Your answer/s: -"
            )}
          </p>

          <p className={styles.yourScore}>
            Score: {question.studentPoints} / {question.points}
          </p>
        </div>
      )
    )}

    {exam.questionsLongResponseResult.map(
      (question: QuestionLongResponse, index: number) => (
        <div key={question.id} className={styles.questionPart}>
          <h1 className={styles.questionTitle}>
            {index + 1 + exam.questionsMultipleChoiceResult.length}/
            {exam.questionsMultipleChoiceResult.length +
              exam.questionsLongResponseResult.length}{" "}
            {question.questionText}
          </h1>

          <p className={styles.textQuestionAnswers}>
            Your answer: {question.studentResponse || "-"}
          </p>

          <p className={styles.yourScore}>
            Score: {question.studentPoints} / {question.points}
          </p>
        </div>
      )
    )}
  </div>
);




};




const ExamAnswers: React.FC<{}> = () => {
  return (
    <>
      <Nav />
      <Body />
    </>
  );
};

export default ExamAnswers;
