import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './Body.module.css';
import withAuth from '../../../../../WithAuth';

interface Props {
  label: string;
  studentPoints : number;
  onSubmit: (value: string) => void;
  points: number;
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

const NumberField: React.FC<Props> = ({ label, onSubmit, studentPoints, points}) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    setValue(studentPoints.toString());
  }, [studentPoints]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^-?\d*$/.test(newValue)) {
      if (Number(newValue) > Number(points)) {
        window.alert("The value is greater than the available points!");
      }
      else{
        setValue(newValue);
        onSubmit(newValue);
      }
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
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set the loading state to true
        console.log(examId, studentId);
        const response = await fetch(
          `http://localhost:8192/exam/viewExamResult/idExam=${examId}/idStudent=${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
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

  const submitAnswer = async (value: string, idQuestion: number) => {
    const url = `http://localhost:8192/exam/evaluate/idStudent=${studentId}/idQuestion=${idQuestion}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: value, // convertiți obiectul în format JSON
      });
  
      // Verificați răspunsul și gestionați-l în consecință
      if (response.ok) {
        console.log('Value submitted successfully!');
      } else {
        console.error('Failed to submit value:', response.status);
      }
    } catch (error) {
      console.error('Error submitting value:', error);
    }
  };

  if (isLoading) {
    return <div className={styles['answer']}>Loading questions, please wait...</div>;
  }

  return (
    <div className={styles['questions-container']}>
      {examResults.map((examResult) => (
        <div key={examResult.id} className={styles.quest}>
          {examResult.questionsMultipleChoiceResult.map((question) => (
            <div key={question.id}>
              <h3 className={styles.questionTitle}>
                {question.questionText}
                <div className={styles['question-points']}>{question.studentPoints}/{question.points}</div>
              </h3>
              <ul className={styles.ull}>
                {question.answersQuestionResult.map((answer) => (
                  <li
                    key={answer.id}
                    className={
                      answer.correct === answer.chosenByStudent && answer.correct === true
                        ? styles['correct-answer']
                        : answer.correct || answer.chosenByStudent
                        ? styles['wrong-answer']
                        : styles['answer']
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
              <h3 className={styles.questionTitle}>
                {question.questionText}
                <div className={styles['question-points']}>
                <NumberField studentPoints={question.studentPoints} points={question.points} label={`Points: `} onSubmit={(value) => submitAnswer(value, question.id)} />
                  <div className={styles['maxim--points']}>/{question.points}</div>
                </div>
              </h3>
              <ul className={styles.ull}>
                <li>
                  <div className={styles['answer-longResponse']}>
                    Expected response: {question.expectedResponse}
                  </div>
                </li>
                <li>
                  <div className={styles['answer-longResponse']}>
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

export default withAuth(Questions, [1]);
