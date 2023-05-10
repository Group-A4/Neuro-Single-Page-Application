import React, { useEffect } from 'react'
import { useState } from "react";
import styles from './Body.module.css'

interface Answer {
    idQuestion: number;
    answerText: string;
    correct: boolean;
  }
interface Question {
    idCourse: number;
    idProfessor: number;
    questionText: String;
    answersQuestion: Answer[];
  }
  

const Questions: React.FC<{}> = () => {

  const [questions, setQuestions] = useState<Question[]>([]);
     useEffect(() => {
      const fetchQuestions = async () => {
        const response = await fetch("http://localhost:8191/questionQuizz/professor=55/course=4");
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
              <h3 className={styles.questionTitle}>{question.questionText}</h3>
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
