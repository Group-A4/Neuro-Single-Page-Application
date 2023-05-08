import React from 'react'
import { useState } from "react";
import styles from './Body.module.css'
type Answer ={
    id: number;
    text: string;
    isCorrect: boolean;
  }
  

  type Question = {
    id:number;
    text: string;
    answers: Answer[];
    time: number;
    dificulty: number;
    points: number;
    short: boolean;
  }
 
  
  

const Questions:  React.FC<{}> = () => {
  const [questions, setQuestions] = useState<Question[]>( [
        {
          id: 1,
          text: 'Question 1',
          answers: [
            { id: 1, text: 'Answer 1', isCorrect: true },
            { id: 2, text: 'Answer 2', isCorrect: false },
            { id: 3, text: 'Answer 3', isCorrect: false },
            { id: 4, text: 'Answer 4', isCorrect: false },
          ],
          time:20,
          points:20,
          dificulty:5,
          short:false,
        },
        {
          id: 2,
          text: 'Question 2',
         answers:[ { id: 1, text: 'My Answer', isCorrect: false }],
          time:20,
          points:20,
          dificulty:5,
          short:true,
        },
        {
          id: 3,
          text: 'Question 2',
          answers: [
            { id: 1, text: 'Answer 1', isCorrect: false },
            { id: 2, text: 'Answer 2', isCorrect: true },
            { id: 3, text: 'Answer 3', isCorrect: false },
            { id: 4, text: 'Answer 4', isCorrect: false },
          ],
          time:20,
          points:20,
          dificulty:5,
          short:false,
        }
      ]);
      const DeleteQuestion = (questionId: number) => {
        setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
      };
    return (
        <div className={styles['questions-container']}>
      {questions.map((question) => (
        <div key={question.id} className={styles.questi}>
           {!question.short &&(
            <div>
          <h3 className={styles.questionTitle}>{question.text} 
          <button className={styles.delete}         onClick={() => DeleteQuestion(question.id)}>delete</button>
          <div className={styles['points'] }> Points: {question.points} </div></h3>
          <ul className={styles.ull}>
            {question.answers.map((answer) => (
              <li key={answer.id}
                 className={answer.isCorrect ? styles['correct-answer'] : styles['answer']}>
                    {answer.text}
              </li>
            ))}
           </ul>
           </div>
           )
}       
  {question.short &&(
    <div>
   <h3 className={styles.questionTitle}>{question.text} 
   <button className={styles.delete}         onClick={() => DeleteQuestion(question.id)}
>delete</button>
   <div className={styles['points'] }> Points: {question.points} </div></h3>
  <ul className={styles.ull}>
    {question.answers.map((answer) => (
      <li key={answer.id}
         className={answer.isCorrect ? styles['correct-answer'] : styles['answer']}>
            {answer.text}
      </li>
    ))}
   </ul>
   </div>
   )
}
        </div>
      ))}
    </div>
  );
};
export default Questions;
