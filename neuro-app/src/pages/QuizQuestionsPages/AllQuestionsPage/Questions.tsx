import React, { useEffect } from 'react'
import { useState } from "react";
import styles from './Body.module.css'

interface Answer {
  idQuestion: number;
  answerText: string;
  correct: boolean;
}
interface Question {
  id: number;
  questionText: String;
  difficulty: number;
  timeMinutes: number;
  lectureNumber: number;
  idCourse: number;
  idProfessor: number;
  answersQuestion: Answer[];
}


const Questions: React.FC<{}> = () => {

  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:8192/questionQuizz");
      const data = await response.json();
      setQuestions(data);
      console.log(data);
    };
    fetchQuestions();
  }, []);

  return (
    <div className={styles['questions-container']}>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div className={styles.quest} key={index} >

            <div className={styles.barInfo}>

              <div className={styles.curs}>
                ID Curs: {question.idCourse}
              </div>

              <div className={styles.time}>
                Difficulty: {question.difficulty}

              </div>

              <div className={styles.difficulty}>
                Time: {question.timeMinutes} min.
              </div>

              <div className={styles.edit}>
                  Edit
              </div>
            </div>

            <div className={styles.questionTitle}>
              {question.id}.  {question.questionText}
            </div>
            <ul className={styles.ull}>
              {question.answersQuestion?.map((answer, index) => (
                <li key={index} className={answer.correct ? styles['correct-answer'] : styles['answer']}>
                  {answer.answerText}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Questions;