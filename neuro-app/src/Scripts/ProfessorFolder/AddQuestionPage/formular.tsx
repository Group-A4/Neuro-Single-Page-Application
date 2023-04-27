import React from 'react'
import { useState } from "react";
import styles from './Body.module.css'
//import { Link } from "react-router-dom";
type Question = {
  text: string;
  answers: { text: string, isCorrect: boolean }[];
}

const Formular: React.FC<{}> = () => {
  
  const [questions, setQuestions] = useState<Question[]>([{ text: '', answers: [{ text: '', isCorrect: false }] }]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  
  const addQuestion = () => {
    setQuestions([...questions, { text: '', answers: [{ text: '', isCorrect: false }] }]);
  };

 
  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({ text: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  
  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].text = event.target.value;
    setQuestions(newQuestions);
  };


  const handleAnswerTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

 
  const handleAnswerCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].isCorrect = event.target.checked;
    setQuestions(newQuestions);
  };


  const removeQuestion = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

 
  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessageVisible(true);
    // hide the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
       <div id="success-message" style={{ display: successMessageVisible ? 'block' : 'none' }} className={styles.mess}>Your questions have been added!</div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
            <input type="text" value={question.text || "Type question here"} className={styles.quest} onChange={(event) => handleQuestionTextChange(event, questionIndex)} />
          </label>
          <button type="button" onClick={() => removeQuestion(questionIndex)} className={styles.removeq}>Remove question</button>
          <div>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <label className={styles.lb}>
                  <input type="checkbox" checked={answer.isCorrect} className={styles.check} onChange={(event) => handleAnswerCheckboxChange(event, questionIndex, answerIndex)} />
                  <input type="text" value={answer.text || "Answer choice"} className={styles.answ} onChange={(event) => handleAnswerTextChange(event, questionIndex, answerIndex)} />
                
                <button type="button" onClick={() => removeAnswer(questionIndex, answerIndex)} className={styles.removea}> Remove answer</button> </label>
                </div>
            ))}
            <button type="button" onClick={() => addAnswer(questionIndex)} className={styles.addansw}>Add choice</button>
          </div>
        </div>
      ))}
      <button type="button" className={styles.addquest} onClick={addQuestion}>Add Question</button>
     <button type="submit" className={styles.sub} >Add Questions</button> 
    </form>
  );
};
  
  export default Formular;