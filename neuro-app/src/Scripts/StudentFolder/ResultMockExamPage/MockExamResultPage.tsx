import React, { useState } from "react";
import Nav from "../NavBarStudent/Nav";
import styles from './MockExamResultPage.module.css';
import CongratsIcon from "./Images/fireworks.svg";
import ButtonTakeAnotherExam from "../Components/ButtonTakeAnotherExam";
import Message from "../Components/MessageBox";
import { useLocation } from 'react-router-dom';

interface QuizQuestion {
  idCourse: number;
  idProfessor: number;
  questionText: string;
  answersQuestion: QuizAnswer[];
  score: number;
}

interface QuizAnswer {
  letter: string;
  id: number;
  answerText: string;
  correct: boolean;
  chosen: boolean;
}

const Body: React.FC<{}> = () => {
  const location = useLocation();
  const { questions, grade } = location.state as {
    questions: QuizQuestion[];
    grade: string;
  };

  return (
    <div>
      <div className={styles["headingTitle"]}>
        <h1>Congratulations! Your score is: {grade} %</h1>
        <h2>Your Mock Exam Result</h2>
      </div>
      <ul>
        {questions.map((question, index) => {
          const userAnswers: QuizAnswer[] = [];
          question.answersQuestion.forEach((answer, answerIndex) => {
            
              const letter = String.fromCharCode(97 + answerIndex);
              if(answer.chosen)
              userAnswers.push({ ...answer, letter });
            
          });


          return (
            <li key={index} className={styles["questionPart"]}>
              <h3 className={styles["questionTitle"]}>
                {index + 1} / {questions.length} {question.questionText}
              </h3>
              <ul>
                {question.answersQuestion.map((answer, answerIndex) => (
                  <li
                    key={answerIndex}
                    className={
                      answer.correct ? styles.correctAnswers : styles.choices
                    }
                  >
                    {String.fromCharCode(97 + answerIndex)}. {answer.answerText}
                  </li>
                ))}
              </ul>
              <p className={styles["yourAnswers"]}>
                Your answer/s:{" "}
                {userAnswers.map(answer => answer.letter).join(", ")}
              </p>
              <p className={styles["yourScore"]}>
                Score: {question.score} / 1
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
    <body className="page">
      <Nav />
      <Body  />
    </body>
  );
};

export default MockExamResult;
