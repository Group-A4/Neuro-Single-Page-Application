import React, { useEffect } from 'react';
import { useState } from "react";
import styles from './Body.module.css';

interface Props {
  label: string;
}

interface QuestionsProps {
  examId?: string | null;
  studentId?: string | null;
}

interface Answer {
  id: number;
  idQuestion: number;
  answerText: string;
  correct: boolean;
  chosenByStudent: boolean;
}

interface MultipleChoiceQuestion {
  id: number;
  idExam: number;
  idProfessor: number;
  questionText: string;
  points: number;
  studentPoints: number;
  answersQuestionResult: Answer[];
}

interface LongResponseQuestion {
  id: number;
  idExam: number;
  idProfessor: number;
  questionText: string;
  points: number;
  studentPoints: number;
  expectedResponse: string;
  studentResponse: string;
}

interface ExamResult {
  id: number;
  idCourse: number;
  idProfessor: number;
  title: string;
  date: string;
  timeExam: number;
  evaluationType: number;
  studentPoints: number;
  examPoints: number;
  questionsMultipleChoiceResult: MultipleChoiceQuestion[];
  questionsLongResponseResult: LongResponseQuestion[];
}

const NumberField: React.FC<Props> = ({ label }) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^-?\d*$/.test(newValue)) { // Only allow digits and minus sign
      setValue(newValue);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <input type="number" value={value ?? ''} onChange={handleChange} className={styles['field']} />
    </div>
  );
};

const Questions: React.FC<QuestionsProps> = ({ examId, studentId }) => {
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set the loading state to true
        console.log(examId, studentId);
        const response = await fetch(
          `http://localhost:8192/exam/viewExamResult/idExam=${examId}/idStudent=${studentId}`
        );
        const data = await response.json();
        console.log('Fetched data:', data);
        setExamResults(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching exam results:', error);
      } finally {
        setIsLoading(false); // Set the loading state to false
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className={styles['answer']}>Loading questions, please wait...</div>;
  }

  return (
    <div className={styles['questions-container']}>
      {examResults.map((examResult) => (
        <div key={examResult.id} className={styles.quest}>
          {examResult.questionsMultipleChoiceResult.map((question) => (
            <div key={question.id}>
              <h3 className={styles.questionTitle}>{question.questionText}
              <div className={styles['question-points']}>{question.studentPoints}/{question.points}</div>
              </h3>
              <ul className={styles.ull}>
              {question.answersQuestionResult.map((answer) => (
              <li
                key={answer.id}
                className={
                  answer.correct === answer.chosenByStudent
                    ? styles['correct-answer']
                    : styles['wrong-answer']
                }
              >
                {answer.answerText}
              </li>
            ))}
              </ul>
            </div>
          ))}

          {examResult.questionsLongResponseResult.map((question) => (
            <div key={question.id}>
              <h3 className={styles.questionTitle}>{question.questionText}
              <div className={styles['question-points']}>
              <NumberField label="Points: "/>
                  <div className={styles['maxim--points']}>/{question.points}</div>
              </div>
              </h3>
              <ul className={styles.ull}>
                <li>
                  <div className={styles['answer']}>
                    Expected response: {question.expectedResponse}
                  </div>
                </li>
                <li>
                  <div className={styles['answer']}>
                      Student response: {question.studentResponse}
                    </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Questions;
