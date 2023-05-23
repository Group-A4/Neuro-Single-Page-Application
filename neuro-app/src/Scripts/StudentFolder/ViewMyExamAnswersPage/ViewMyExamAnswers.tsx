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

const Body: React.FC<{}> = () => {
  const [exam, setExam] = useState<Exam | null>(null);
  const { examId } = useParams<{ examId: string }>();

  useEffect(() => {
    // Fetch data using the GET method
    fetch(
      `http://localhost:8192/exam/viewExamResult/idExam=${examId}/idStudent=45`
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
                      (
                        answer: Answer,
                        index: number,
                        answersArray: Answer[]
                      ) => (
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
              <span className={styles.boldText}>Your answer: </span>{" "}
              {question.studentResponse || "-"}
            </p>

            <p className={styles.expectedResponse}>
              <span className={styles.boldText}>Expected response: </span>
              {question.expectedResponse}
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

