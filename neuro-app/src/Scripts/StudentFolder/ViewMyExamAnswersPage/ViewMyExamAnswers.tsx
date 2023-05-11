import React, { useState } from 'react';
import Nav from '../NavBarStudent/Nav';
import styles from './ViewMyExamAnswers.module.css';
import '../QuestionMockExamPage/QuestionMockExamPage';
import Frame from "../Components/Frame";

interface QuizQuestion {
    id: number;
    idCourse: number;
    idProfessor: number;
    questionText: string;
    answersQuestion?: QuizAnswer[];
    isMultipleChoice: boolean; 
}

interface QuizAnswer {
    idQuestion: number;
    answerText: string;
    correct?: boolean;
    chosen?: boolean;
    score?: number;
}

const hardcodedQuestions: QuizQuestion[] = [

     {
        id: 1,
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the formula for water?",
        answersQuestion: [],
        isMultipleChoice: false,
    },
    {
        id: 2,
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the symbol for the element oxygen?",
        answersQuestion: [],
        isMultipleChoice: false,
    },
    {
        id: 3,
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the capital of France?",
        answersQuestion: [
            {
                idQuestion: 1,
                answerText: "Paris",
                correct: true,
            },
            {
                idQuestion: 1,
                answerText: "Madrid",
                correct: false,
            },
            {
                idQuestion: 1,
                answerText: "Berlin",
                correct: false,
            },
            {
                idQuestion: 1,
                answerText: "London",
                correct: false,
            },
        ],
        isMultipleChoice: true,
    },
    {
        id: 4,
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the largest ocean in the world?",
        answersQuestion: [
            {
                idQuestion: 2,
                answerText: "Atlantic Ocean",
                correct: false,
            },
            {
                idQuestion: 2,
                answerText: "Indian Ocean",
                correct: false,
            },
            {
                idQuestion: 2,
                answerText: "Arctic Ocean",
                correct: false,
            },
            {
                idQuestion: 2,
                answerText: "Pacific Ocean",
                correct: true,
            },
        ],
        isMultipleChoice: true,
    }
];

const userAnswers: QuizAnswer[] = [
  { idQuestion: 1, answerText: "Response1" , score: 0.5},
  { idQuestion: 2, answerText: "Response2" , score: 1},
  { idQuestion: 3, answerText: "Paris", correct: true, chosen: true , score: 1},
  { idQuestion: 4, answerText: "Indian Ocean", correct: false, chosen: true, score: 0},
];

const Body: React.FC<{}> = () => {
  const [questions, setQuestions] =
    useState<QuizQuestion[]>(hardcodedQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <div className="body">
      <div className={styles["bodyTitle"]}>
        Here are your answers to the exam
      </div>

      {questions.map((question, index) => {
        return (
          <div key={question.id} className={styles["questionPart"]}>
            <h1 className={styles["questionTitle"]}>
              {index + 1}/{questions.length} {question.questionText}
            </h1>

            {question.isMultipleChoice ? (
              <div className={styles["questionAnswers"]}>
                {question.answersQuestion ? (
                  <ul>
                    {question.answersQuestion.map((answer, index) => (
                      <li
                        key={index}
                        className={
                          answer.correct
                            ? styles.correctAnswers
                            : styles.choices
                        }
                      >
                        {answer.answerText}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
                <p className={styles["yourAnswers"]}>
                  Your answer/s: {userAnswers[index].answerText}
                </p>
              </div>
            ) : (
              <p className={styles["textQuestionAnswers"]}>
                {userAnswers[index].answerText}
              </p>
            )}
            <p className={styles["yourScore"]}>
              Score: {userAnswers[index].score} / 1
            </p>
          </div>
        );
      })}
    </div>
  );
};


const ExamAnswers: React.FC<{}> = () => {
    return (
      <>
        <Nav />
        <Body/>
      </>
    );
}

export default ExamAnswers;
