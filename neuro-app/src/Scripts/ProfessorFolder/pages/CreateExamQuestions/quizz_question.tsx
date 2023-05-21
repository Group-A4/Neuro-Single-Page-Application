import React from 'react'
import { useState, useRef } from "react";
import styles from './Body.module.css'
import Header from './header'
//import { Link } from "react-router-dom";

interface MultipleChoice {
  id: number;
  idProfessor: number;
  questionText: string;
  points: number;
  answersQuestion: MultipleChoiceAnswers[];
}

interface MultipleChoiceAnswers {
  id: number;
  answerText: string;
  correct: boolean;
}

interface LongResponse {
  idProfessor: number;
  questionText: string;
  points: number;
  expectedResponse: string;
}


const Quizz_question: React.FC<{}> = () => {
  
  const [questionsMultipleChoice, setQuestionsMultipleChoice] = useState<MultipleChoice[]>([]);
  const [questionsLongResponse, setQuestionsLongResponse] = useState<LongResponse[]>([]); 
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  const lastLongResponseRef = useRef<HTMLDivElement>(null);



  const addQuestionLong = () => {
    const newQuestion: LongResponse = {
      idProfessor: 52,
      questionText: '',
      points: 0,
      expectedResponse: '',
    };
    setQuestionsLongResponse((prevQuestions) => [...prevQuestions, newQuestion]);
  if (lastLongResponseRef.current) {
    lastLongResponseRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  };

  const addMultipleChoice = () => {
    const newQuestion: MultipleChoice = {
      id:0,
      idProfessor: 52,
      questionText: '',
      points: 0,
      answersQuestion: [],
    };
    setQuestionsMultipleChoice((prevQuestions) => [...prevQuestions, newQuestion]);
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  };

 
  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questionsMultipleChoice];
    const newAnswer: MultipleChoiceAnswers = {
      id: newQuestions[questionIndex].answersQuestion.length, // Generate unique id for answer
      answerText: "",
      correct: false,
    };
    newQuestions[questionIndex].answersQuestion.push(newAnswer);
    setQuestionsMultipleChoice(newQuestions);
  };

  
  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    setQuestionsMultipleChoice((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].questionText = event.target.value;
      return newQuestions;
    });
  };


  const handleAnswerTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    answerIndex: number
  ) => {
    setQuestionsMultipleChoice((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].answersQuestion[answerIndex].answerText = event.target.value;
      return newQuestions;
    });
  };

 
  const handleAnswerCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    answerIndex: number
  ) => {
    setQuestionsMultipleChoice((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].answersQuestion[answerIndex].correct = event.target.checked;
      return newQuestions;
    });
  };

  const handleExpectedResponseChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    setQuestionsLongResponse((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].expectedResponse = event.target.value;
      return newQuestions;
    });
  };

  const removeMultipleChoiceQuestion = (questionIndex: number) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this question?");
    if (confirmDelete) {
      setQuestionsMultipleChoice((prevQuestions) => {
        const newQuestions = [...prevQuestions];
        newQuestions.splice(questionIndex, 1);
        return newQuestions;
      });
    }

  };

  const removeMultipleChoiceAnswer = (questionIndex: number, answerIndex: number) => {
    setQuestionsMultipleChoice((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        answersQuestion: newQuestions[questionIndex].answersQuestion.filter(
          (_, index) => index !== answerIndex
        ),
      };
      return newQuestions;
    });
  };

  const removeQuestionLongResponse = (questionIndex: number) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this question?");
    if (confirmDelete) {
      setQuestionsLongResponse((prevQuestions) => {
        const newQuestions = [...prevQuestions];
        newQuestions.splice(questionIndex, 1);
        return newQuestions;
      });
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessageVisible(true);
    // hide the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 3000);
    console.log('Multiple Choice Questions:', questionsMultipleChoice);
    console.log('Long Response Questions:', questionsLongResponse);
  };

  const setPointMultipleChoice = (questionIndex: number, value: number) => {
    const newQuestionsMultipleChoice = [...questionsMultipleChoice];
    newQuestionsMultipleChoice[questionIndex].points = value;
    setQuestionsMultipleChoice(newQuestionsMultipleChoice);

  };

  const setPointLongResponse = (questionIndex: number, value: number) => {
    const newQuestionsLongResponse = [...questionsLongResponse];
    newQuestionsLongResponse[questionIndex].points = value;
    setQuestionsLongResponse(newQuestionsLongResponse);
  };


  return (
    <form onSubmit={handleSubmit}>
          <div className={styles['body--second_text']}>
                Add content to your exam.</div>
      {questionsMultipleChoice.map((question, questionIndex) => (
        <div key={questionIndex}  ref={questionIndex === questionsMultipleChoice.length - 1 ? lastQuestionRef : null}>
        <div className={styles['box']}>
            <Header
              point={question.points.toString()}
              setPoint={(newPoints) => setPointMultipleChoice(questionIndex, Number(newPoints))}
            />
              <label>
                <input
                  type="text"
                  value={question.questionText}
                  placeholder="Type question here"
                  className={styles.quest}
                  onChange={(event) => handleQuestionTextChange(event, questionIndex)}
                />
              </label>
            <button type="button" onClick={() => removeMultipleChoiceQuestion(questionIndex)} className={styles.removeq}>
              Remove 
            </button>
          <div>
              {question.answersQuestion.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <label className={styles.lb}>
                      <input 
                        type="checkbox" 
                        checked={answer.correct} 
                        className={styles.check} 
                        onChange={(event) => handleAnswerCheckboxChange(event, questionIndex, answerIndex)} 
                      />
                      
                    <input
                      type="text"
                      value={answer.answerText}
                      placeholder="Answer choice"
                      className={styles.answ}
                      onChange={(event) => handleAnswerTextChange(event, questionIndex, answerIndex)}
                    />
                    <button 
                      type="button" 
                      onClick={() => removeMultipleChoiceAnswer(questionIndex, answerIndex)} 
                      className={styles.removea}> 
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

      {questionsLongResponse.map((question, questionIndex) => (
        <div key={questionIndex} ref={questionIndex === questionsLongResponse.length - 1 ? lastLongResponseRef : null}>          
        <div className={styles['box']}>

            <Header
              point={question.points.toString()}
              setPoint={(newPoints) => setPointLongResponse(questionIndex, Number(newPoints))}
            />
            <input
            type="text"
            value={question.expectedResponse}
              placeholder="Type question here"
            className={styles.quest}
            onChange={(event) => handleExpectedResponseChange(event, questionIndex)}
          />
            <input
              type="text"
              value={question.expectedResponse}
              placeholder="Expected response"
              className={styles.resplong}
              onChange={(event) => handleExpectedResponseChange(event, questionIndex)}
            />
          <button type="button" onClick={() => removeQuestionLongResponse(questionIndex)} className={styles.removeq2}>
            Remove
          </button>
          </div>
        </div>
      ))}

      <button type="button" className={styles.addquest} onClick={addMultipleChoice}>+ Add Multiple Choice</button>
      <button type="button" className={styles.addquestL} onClick={addQuestionLong}>+ Add Short Answer</button>
    </form>
  );
};
  
export default Quizz_question;