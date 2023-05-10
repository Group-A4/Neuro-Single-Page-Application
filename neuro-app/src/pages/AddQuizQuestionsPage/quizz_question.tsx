import React from 'react'
import { useState } from "react";
import styles from './Body.module.css'
import Header from './header'
import { Link } from 'react-router-dom';
//import { Link } from "react-router-dom";
interface Answer {
  idQuestion: number;
  answerText: string;
  correct: boolean;
}
interface Question {
  id: number;
  questionText: string;
  difficulty: number;
  timeMinutes: number;
  lectureNumber: number;
  idCourse: number;
  idProfessor: number;
  answersQuestion: Answer[];
}


const Quizz_question: React.FC<{}> = () => {
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  
  const addQuestion = () => {
    const newQuestion: Question = {
      id: 36,
      questionText: '',
      difficulty: 0,
      timeMinutes: 0,
      lectureNumber: 2,
      idCourse: 5,
      idProfessor: 56,
      answersQuestion: [{ idQuestion: 1, answerText: '', correct: false }],
    };
    setQuestions([...questions, newQuestion]);
  };

 
  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    const newAnswer: Answer = {
      idQuestion: newQuestions[questionIndex].id, // Asigurați-vă că id-ul întrebării este preluat corect
      answerText: '',
      correct: false,
    };
    newQuestions[questionIndex].answersQuestion.push(newAnswer);
    setQuestions(newQuestions);
  };

  
  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].questionText = event.target.value;
    setQuestions(newQuestions);
  };


const handleAnswerTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
  const newQuestions = [...questions];
  newQuestions[questionIndex].answersQuestion[answerIndex].answerText = event.target.value;
  setQuestions(newQuestions);
};

 
  const handleAnswerCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answersQuestion[answerIndex].correct = event.target.checked;
    setQuestions(newQuestions);
  };


  const removeQuestion = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };


 
  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answersQuestion.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessageVisible(true);

    try {
      const response = await fetch("http://localhost:8192/questionQuizz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questions),
      });

      if (response.ok) {
        console.log("Răspunsul a fost trimis cu succes!");
      } else {
        console.log("A apărut o eroare la trimiterea răspunsului.");
      }
    } catch (error) {
      console.log("A apărut o eroare la trimiterea răspunsului.", error);
    }

    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 3000);
  };


  const setTime = (questionIndex: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].timeMinutes = value;
    setQuestions(newQuestions);
  };

    
  const setDifficulty = (questionIndex: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].difficulty = value;
    setQuestions(newQuestions);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['body--second_text']}>
        Enter the question and the answer options, ticking the correct answers.<br />
        Determine the difficulty and time of the question.
      </div>
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <div className={styles['box']}>
            <Header
              time={question.timeMinutes}
              difficulty={question.difficulty}
              setTime={(newTime) => setTime(questionIndex, newTime)}
              setDifficulty={(newDifficulty) => setDifficulty(questionIndex, newDifficulty)}
            />
            <label>
              <input
                type="text"
                value={question.questionText ? question.questionText : "Type question here"}
                className={styles.quest}
                onChange={(event) => handleQuestionTextChange(event, questionIndex)}
              />
            </label>
            <button type="button" onClick={() => removeQuestion(questionIndex)} className={styles.removeq}>
              Remove
            </button>
            <div>
              {question.answersQuestion.map((answer, answerIndex) => (
                <div key={answer.idQuestion}>
                  <label className={styles.lb}>
                    <input
                      type="checkbox"
                      checked={answer.correct}
                      className={styles.check}
                      onChange={(event) => handleAnswerCheckboxChange(event, questionIndex, answerIndex)}
                    />
                    <input
                      type="text"
                      value={answer.answerText ? answer.answerText : "Answer choice"}
                      className={styles.answ}
                      onChange={(event) => handleAnswerTextChange(event, questionIndex, answerIndex)}
                    />
                    <button
                      type="button"
                      onClick={() => removeAnswer(questionIndex, answerIndex)}
                      className={styles.removea}
                    >
                      Remove
                    </button>
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addAnswer(questionIndex)} className={styles.addansw}>
                + Add answer
              </button>
            </div>
          </div>
        </div>
      ))}
        <button type="button" className={styles.addquest} onClick={addQuestion}>
          + Add Multiple Choice
        </button>

        <button type="submit" className={styles['button--create']}>
          Save and Exit
        </button>

    </form>
  );
};
  
  export default Quizz_question;