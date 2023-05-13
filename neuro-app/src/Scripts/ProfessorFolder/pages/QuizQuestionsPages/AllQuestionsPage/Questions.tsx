import React from 'react'
import { useState } from "react";
import styles from './Body.module.css'
type Answer ={
    id: number;
    text: string;
    isCorrect: boolean;
  }
  type Question= {
    id: number;
    text: string;
    answers: Answer[];
  }
  

const Questions: React.FC<{}> = () => {
     const questions: Question[] = [
        {
          id: 1,
          text: 'Question 1',
          answers: [
            { id: 1, text: 'Answer 1', isCorrect: true },
            { id: 2, text: 'Answer 2', isCorrect: false },
            { id: 3, text: 'Answer 3', isCorrect: false },
            { id: 4, text: 'Answer 4', isCorrect: false },
          ]
        },
        {
          id: 2,
          text: 'Question 2',
          answers: [
            { id: 1, text: 'Answer 1', isCorrect: false },
            { id: 2, text: 'Answer 2', isCorrect: true },
            { id: 3, text: 'Answer 3', isCorrect: false },
            { id: 4, text: 'Answer 4', isCorrect: false },
          ]
        }
      ];
    return (
        <div className={styles['questions-container']}>
      {questions.map((question) => (
        <div key={question.id} className={styles.quest}>
          <h3 className={styles.questionTitle}>{question.text}</h3>
          <ul className={styles.ull}>
            {question.answers.map((answer) => (
              <li key={answer.id}
                 className={answer.isCorrect ? styles['correct-answer'] : styles['answer']}>
                    {answer.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default Questions;
