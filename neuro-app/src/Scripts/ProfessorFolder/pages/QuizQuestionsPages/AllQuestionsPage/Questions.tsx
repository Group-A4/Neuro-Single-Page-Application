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
interface QuestionsProps {
  idCourse: number | null;
}
const Questions: React.FC<QuestionsProps> = ({ idCourse }) => {

  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      if (idCourse !== null) {
        const response = await fetch(`http://localhost:8192/questionQuizz/professor=56/course=${idCourse}`);
        const data = await response.json();
        setQuestions(data);
        console.log(data);
      }
    };
    fetchQuestions();
  }, [idCourse]);
  
  const handleDelete = async (questionId: number) => {
    try {
      const response = await fetch(`http://localhost:8192/questionQuizz/delete/${questionId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted question from the state
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
        console.log(`Question ${questionId} deleted successfully`);
      } else {
        console.error(`Failed to delete question ${questionId}`);
      }
    } catch (error) {
      console.error(`Failed to delete question ${questionId}: ${error}`);
    }
  };
  return (
    <div className={styles['questions-container']}>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div className={styles.quest} key={index} >
            <div className={styles.barInfo}>


              <div className={styles.time}>
                Difficulty: {question.difficulty}

              </div>

              <div className={styles.difficulty}>
                Time: {question.timeMinutes} min.
              </div>

              <button className={styles.edit} onClick={() => handleDelete(question.id)}>
                Delete
              </button>
            </div>
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
        <p>
          Waiting for a course to be selected...</p>
      )}
    </div>
  );
};
export default Questions;