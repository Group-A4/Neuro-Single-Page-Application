import React, { useState } from "react";
import Nav from "../NavBarStudent/Nav";
import styles from './MockExamResultPage.module.css';
import ButtonTakeAnotherExam from "../Components/ButtonTakeAnotherExam";
import Message from "../Components/MessageBox";

interface QuizQuestion {
  idCourse: number;
  idProfessor: number;
  questionText: string;
  answersQuestion: QuizAnswer[];
}

interface QuizAnswer {
  idQuestion: number;
  answerText: string;
  correct: boolean;
  chosen: boolean;
}

interface QuizResultProps {
  questions: QuizQuestion[];
  userAnswers: QuizAnswer[];
}

const questions: QuizQuestion[] = [
  {
    idCourse: 1,
    idProfessor: 1,
    questionText: "What is the capital of France?",
    answersQuestion: [
      { idQuestion: 1, answerText: "Paris", correct: true, chosen: false },
      { idQuestion: 1, answerText: "Rome", correct: true, chosen: false },
      { idQuestion: 1, answerText: "Berlin", correct: false, chosen: false },
      { idQuestion: 1, answerText: "Madrid", correct: false, chosen: false },
    ],
  },
  {
    idCourse: 1,
    idProfessor: 1,
    questionText: "What is the largest ocean?",
    answersQuestion: [
      { idQuestion: 2, answerText: "Atlantic", correct: false, chosen: false },
      { idQuestion: 2, answerText: "Indian", correct: false, chosen: false },
      { idQuestion: 2, answerText: "Pacific", correct: true, chosen: false },
      { idQuestion: 2, answerText: "Arctic", correct: false, chosen: false },
    ],
  },
  {
    idCourse: 1,
    idProfessor: 1,
    questionText: "What is the capital of Japan?",
    answersQuestion: [
      { idQuestion: 3, answerText: "Tokyo", correct: true, chosen: false },
      { idQuestion: 3, answerText: "Kyoto", correct: false, chosen: false },
      { idQuestion: 3, answerText: "Osaka", correct: false, chosen: false },
      { idQuestion: 3, answerText: "Nagoya", correct: false, chosen: false },
    ],
  },
];

const userAnswers: QuizAnswer[] = [
  { idQuestion: 1, answerText: "Paris", correct: true, chosen: true },
  { idQuestion: 1, answerText: "Berlin", correct: false, chosen: true },
  { idQuestion: 2, answerText: "Pacific", correct: true, chosen: false },
  { idQuestion: 3, answerText: "Kyoto", correct: false, chosen: false },
];

const Body: React.FC<{ score: string }> = ({ score }) => {
  const [userAnswersState, setUserAnswersState] = useState(userAnswers);

  return (
    <div>
      <div className={styles["headingTitle"]}>
        <h1>Congratulations! Your score is: {score}</h1>
        <h2>Your Mock Exam Result</h2>
      </div>
      <ul>
        {questions.map((question, index) => {
          const userAnswers = userAnswersState.filter(
            (answer) =>
              answer.idQuestion === question.answersQuestion[index].idQuestion
          );
          return (
            <li key={index} className={styles["questionPart"]}>
              <h3 className={styles["questionTitle"]}>
                {index + 1} / {questions.length} {question.questionText}
              </h3>
              <ul>
                {question.answersQuestion.map((answer, index) => (
                  <li
                    key={index}
                    className={
                      answer.correct ? styles.correctAnswers : styles.choices
                    }
                  >
                    {answer.answerText}
                  </li>
                ))}
              </ul>
              <p className={styles["yourAnswers"]}>
                Your answer/s:{" "}
                {userAnswers.map((a: QuizAnswer) => a.answerText).join(", ")}
              </p>
            </li>
          );
        })}
      </ul>
      <div className={styles["messageBox"]}>
        <Message />
      </div>
      <div className={styles["buttonTake"]}>
        <ButtonTakeAnotherExam />
      </div>
    </div>
  );
};

const MockExamResult: React.FC = () => {
  const score = "50.5%";

  return (
    <>
      <body className="page">
        <Nav />
        <Body score={score} />
      </body>
    </>
  );
};

export default MockExamResult;
