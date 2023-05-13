import React from 'react'
import { useState } from "react";
import styles from './Body.module.css'
import Header from './header'
//import { Link } from "react-router-dom";
type Question = {
  text: string;
  answers: { text: string, isCorrect: boolean }[];
  time: number;
  dificulty: number;
  points: number;
  l: boolean;
}


const Quizz_question: React.FC<{}> = () => {
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  
  const addQuestion=() => {
    setQuestions([...questions, { text: 'Type question here', answers: [{ text: '', isCorrect: false }], time: 0,dificulty:0, points:0, l:false}]);
  };

 
  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({ text: '', isCorrect: false});
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



    const addQuestionLong = () => {
        setQuestions([...questions, { text: 'Type question here', answers: [{ text: '', isCorrect: false }], time: 0,dificulty:0, points:0, l:true}]);
      };
    const setTime=(questionIndex: number, value: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].time = value;
        setQuestions(newQuestions);
    }
    const setPoint = (questionIndex: number, value: number) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].points = value;
      setQuestions(newQuestions);
    };
    
    const setDifficulty = (questionIndex: number, value: number) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].dificulty = value;
      setQuestions(newQuestions);
    };


  return (
    <form onSubmit={handleSubmit}>
          <div className={styles['body--second_text']}>
                Add content to your exam.</div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          {!question.l &&
          <div className={styles['box']}>
          <Header time={question.time} point={question.points} difficulty={question.dificulty}  setTime={(newTime) => setTime(questionIndex, newTime)}
  setPoint={(newPoints) => setPoint(questionIndex, newPoints)}
  setDifficulty={(newDifficulty) => setDifficulty(questionIndex, newDifficulty)}/>
          <label>
            <input type="text" value={question.text || "Type question here "} className={styles.quest} onChange={(event) => handleQuestionTextChange(event, questionIndex)} />
          </label>
          <button type="button" onClick={() => removeQuestion(questionIndex)} className={styles.removeq}>Remove </button>
          <div>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <label className={styles.lb}>
                <input type="checkbox" checked={answer.isCorrect} className={styles.check} onChange={(event) => handleAnswerCheckboxChange(event, questionIndex, answerIndex)} />
                <input type="text" value={answer.text || "Answer choice"} className={styles.answ} onChange={(event) => handleAnswerTextChange(event, questionIndex, answerIndex)} />
                <button type="button" onClick={() => removeAnswer(questionIndex, answerIndex)} className={styles.removea}> Remove</button> </label>
                </div>
            ))}
            <button type="button" onClick={() => addAnswer(questionIndex)} className={styles.addansw}>+ Add answer</button>
          </div>
          </div>
        }
        {question.l &&
         <div className={styles['box']}>
         <Header time={question.time} point={question.points} difficulty={question.dificulty}  setTime={(newTime) => setTime(questionIndex, newTime)}
 setPoint={(newPoints) => setPoint(questionIndex, newPoints)}
 setDifficulty={(newDifficulty) => setDifficulty(questionIndex, newDifficulty)}/>
         <label>
           <input type="text" value={question.text || "Type question here "} className={styles.quest} onChange={(event) => handleQuestionTextChange(event, questionIndex)} />
         </label>
         <button type="button" onClick={() => removeQuestion(questionIndex)} className={styles.removeq}>Remove </button>
         </div>

        }
           </div> 
      ))}
        <button type="button" className={styles.addquest} onClick={addQuestion}>+ Add Multiple Choice</button>
        <button type="button" className={styles.addquestL} onClick={addQuestionLong}>+ Add Short Answer</button>
    </form>
  );
};
  
  export default Quizz_question;