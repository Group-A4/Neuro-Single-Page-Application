import React, { useEffect } from 'react'
import { useState } from "react";
import styles from './Body.module.css'
import withAuth from '../../../../../WithAuth';

interface Answer {
  id: number;
  idQuestion: number;
  answerText: string;
  correct: boolean;
}
interface Question {
  id: number;
  questionText: string;
  difficulty: number;
  timeMinutes: number;
  idLecture: number;
  idProfessor: number;
  answersQuestion: Answer[];
  isEditing: boolean;
  error: string;
}
interface QuestionsProps {
  idCourse: number | null;
  idLecture: number | null;
}
const Questions: React.FC<QuestionsProps> = ({ idCourse, idLecture }) => {

  const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchQuestions = async () => {
      if (idCourse !== null) {
        let url: string = `http://localhost:8192/questionQuizz/professor=52/course=${idCourse}`;
        if (idLecture !== null) {
          url = `http://localhost:8192/questionQuizz/course=${idCourse}/lecture=${idLecture}`;
        }
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await response.json();
        setQuestions(data);
        console.log(data);
      }
    };
    fetchQuestions();
  }, [idCourse, idLecture]);

  const handleDelete = async (questionId: number) => {
    try {
      const response = await fetch(`http://localhost:8192/questionQuizz/delete/${questionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
        console.log(`Question ${questionId} deleted successfully`);
        return; // Return here to prevent further execution
      }
      console.error(`Failed to delete question ${questionId}`);
    } catch (error) {
      console.error(`Failed to delete question ${questionId}: ${error}`);
    }
  };

  const handleEdit = (questionId: number) => {
    setEditQuestionId((prevEditQuestionId) => (prevEditQuestionId === questionId ? null : questionId));
    setIsEditing(true);
    console.log(`Edit question ${questionId}`);
  };

  const handleQuestionTextChange = (text: string, questionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, questionText: text } : question
      )
    );
  };

  const handleSave = (questionId: number) => {
    const questionToSave = questions.find((question) => question.id === questionId);
    if (!questionToSave || questionToSave.questionText.trim() === '') {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, error: 'Please add question text.' } : question
        )
      );
      return;
    }

    const hasNoAnswers = questionToSave.answersQuestion.every((answer) => answer.answerText.trim() === '');
    if (hasNoAnswers) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, error: 'Please add at least one answer.' } : question
        )
      );
      return;
    }

    const hasAnswersNoText = questionToSave.answersQuestion.some((answer) => answer.answerText.trim() === '');
    if (hasAnswersNoText) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, error: 'Please add text for all answers.' } : question
        )
      );
      return;
    }


    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, error: '' } : question
      )
    );

    setEditQuestionId(null);
    setIsEditing(false);
    handleEditQuestion(questionId);
  };

  const handleEditQuestion = async (questionId: number) => {
    const questionToUpdate = questions.find((question) => question.id === questionId);
    if (questionToUpdate) {
      try {
        const response = await fetch(`http://localhost:8192/questionQuizz/update/${questionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(questionToUpdate),
        });
        if (response.ok) {
          console.log(`Question ${questionId} updated successfully`);
        } else {
          console.error(`Failed to update question ${questionId}`);
        }
      } catch (error) {
        console.error(`Failed to update question ${questionId}: ${error}`);
      }
    }
  };


  const handleTimeChange = (value: string, questionId: number) => {
    const timeMinutes = parseInt(value);
    if (Number.isNaN(timeMinutes) || timeMinutes < 0) {
      // Valoarea introdusă nu este un număr valid sau este negativă
      return;
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, timeMinutes: timeMinutes } : question
      )
    );
  };

  const handleDifficultyChange = (value: string, questionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, difficulty: parseInt(value) } : question
      )
    );
  };

  const handleAnswerTextChange = (value: string, questionId: number, answerIndex: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
            ...question,
            answersQuestion: question.answersQuestion.map((answer, index) =>
              index === answerIndex ? { ...answer, answerText: value } : answer
            ),
          }
          : question
      )
    );
  };
  const handleAnswerCheckboxChange = (questionId: number, answerIndex: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
            ...question,
            answersQuestion: question.answersQuestion.map((answer, index) =>
              index === answerIndex ? { ...answer, correct: !answer.correct } : answer
            ),
          }
          : question
      )
    );
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].answersQuestion.splice(answerIndex, 1);
      return newQuestions;
    });
  };


  const addAnswer = (questionIndex: number, questionId: number) => {
    const newQuestions = [...questions];
    const newAnswer: Answer = {
      id: newQuestions[questionIndex].answersQuestion.length,
      idQuestion: newQuestions[questionIndex].id,
      answerText: '',
      correct: false,
    };
    newQuestions[questionIndex].answersQuestion.push(newAnswer);
    setQuestions(newQuestions);
  };

  return (
    <div className={styles['questions-container']}>
      {questions.length > 0 ? (
        questions.map((question, indexQ) => (
          
          <div className={styles.quest} key={indexQ}>
            {question.error && <p className={styles.error}>{question.error}</p>}
            <div className={styles.barInfo}>
              <div className={styles.time}>
                {editQuestionId === question.id ? (
                  
                  <>
                    <label htmlFor={`time-${question.id}`}>Time:</label>
                    <input
                      id={`time-${question.id}`}
                      type="text"
                      value={question.timeMinutes}
                      onChange={(e) => handleTimeChange(e.target.value, question.id)}
                    />
                    {question.timeMinutes < 0 && <p className={styles.error}>Time cannot be negative</p>}
                  </>
                ) : (
                  <>
                    Time: {question.timeMinutes}
                  </>
                )}
              </div>
              <div className={styles.difficulty}>
                {editQuestionId === question.id ? (
                  <>
                    <label htmlFor={`difficulty-${question.id}`}>Difficulty:</label>
                    <select
                      id={`difficulty-${question.id}`}
                      value={question.difficulty}
                      onChange={(e) => handleDifficultyChange(e.target.value, question.id)}
                      className={styles.select_stile}
                    >
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1} className={styles.selectDropdown}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    Difficulty: {question.difficulty}
                  </>
                )}
              </div >
              <div className={styles.but}>
                <button className={styles.edit} onClick={() => handleDelete(question.id)}>
                  Delete
                </button>
                {!isEditing && (
                  <button className={styles.edit} onClick={() => handleEdit(question.id)}>
                    Edit
                  </button>
                )}
                {isEditing && editQuestionId === question.id && (
                  <button className={styles.edit} onClick={() => handleSave(question.id)}>
                    Save
                  </button>
                )}
              </div>
            </div>
            {editQuestionId === question.id ? (
              <>
                <h3 className={styles.questionTitle}>Question:
                  <input
                    id={`question-${question.id}`}
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionTextChange(e.target.value, question.id)}
                  /> </h3>
              </>

            ) : (
              <h3 className={styles.questionTitle}>{question.questionText}</h3>
            )
            }
            <ul className={styles.ull}>
              {question.answersQuestion?.map((answer, index) => (
                <li key={index} className={editQuestionId === question.id ? styles['answer'] : answer.correct ? styles['correct-answer'] : styles['answer']}>
                  {editQuestionId === question.id ? (
                    <>

                      <input
                        type="checkbox"
                        checked={answer.correct}
                        onChange={() => handleAnswerCheckboxChange(question.id, index)}
                      />


                      <label htmlFor={`answer-${question.id}-${index}`}>Answer:</label>
                      <input
                        id={`answer-${question.id}-${index}`}
                        type="text"
                        value={answer.answerText}
                        onChange={(e) => handleAnswerTextChange(e.target.value, question.id, index)}
                        className={styles.answStyle}
                      />
                      <button
                        type="button"
                        onClick={() => removeAnswer(indexQ, index)}
                        className={styles.removea}
                      >
                        Remove
                      </button>
                    </>

                  ) : (
                    answer.answerText
                  )}
                </li>
              ))}
              {editQuestionId === question.id ? (
                <button type="button" onClick={() => addAnswer(indexQ, question.id)} className={styles.addansw}>
                  + Add answer
                </button>
              ) : (" ")
              }
            </ul>
          </div>
        ))
      ) : (
          <p>There are no quiz questions for the selected course or lecture...</p>
      )}
    </div>
  );
};
export default withAuth(Questions, [1]);