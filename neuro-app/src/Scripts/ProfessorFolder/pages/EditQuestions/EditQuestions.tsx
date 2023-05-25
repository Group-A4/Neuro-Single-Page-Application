import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css';
import Questions from './Questions';

import { Link } from "react-router-dom";
import ButtonSaveExit from '../../components/buttonSaveAndExit/ButtonAddQuestion';
import { useLocation } from 'react-router-dom';
import Header from './header'

interface AnswerInterface {
    id: number;
    idQuestion: number;
    answerText: string;
    correct: boolean;
  }
  interface ExamData{
    
        id: number,
        title: string,
        date: string;
        timeExam: number,
        evaluationType: number
      
  }
  
  interface QuestionMultipleChoiceInterface {
    id: number;
    idExam: number;
    idProfessor: number;
    questionText: string;
    points: number;
    answersQuestion: AnswerInterface[];
  }
  
  interface QuestionLongResponseInterface {
    id: number;
    idExam: number;
    idProfessor: number;
    questionText: string;
    points: number;
    expectedResponse: string;
  }
  
  interface ExamInterface {
    id: number;
    idCourse: number;
    idProfessor: number;
    title: string;
    date: string;
    timeExam: number;
    evaluationType: number;
    questionsMultipleChoice: QuestionMultipleChoiceInterface[];
    questionsLongResponse: QuestionLongResponseInterface[];
  }
  interface QuestionLong {
    idProfessor: number;
    questionText: string;
    points: number;
    expectedResponse: string;
  }
  interface LongResponse {
    idProfessor: number;
    questionText: string;
    points: number;
    expectedResponse: string;
}
interface MultipleChoiceAnswers{
    answerText:string;
    correct:boolean;
}
interface MultipleChoice{
    idProfessor: number;
    questionText: string;
    points: number;
    answersQuestion: MultipleChoiceAnswers[];
}

const EditQuestion: React.FC<{}> = () => {
    const location = useLocation();
    const { prop1 } = location.state;
    const [exam, setExam] = useState<ExamInterface | undefined>();
    const [questionsLong, setQuestionsLong] = useState<QuestionLongResponseInterface[]>([]);
    const [questionsMultiple, setQuestionsMultiple] = useState<QuestionMultipleChoiceInterface[]>([]);
    const [editedLongQuestion, setEditedLongQuestion] = useState<QuestionLongResponseInterface | null>(null);
    const [editedMultipleQuestion, setEditedMultipleQuestion] = useState<QuestionMultipleChoiceInterface | null>(null); 
    
  useEffect(() => {
    const url = `http://localhost:8192/exam/code=${prop1}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Update the exam state with the fetched data
        setExam(data);
        setQuestionsLong(data?.questionsLongResponse);
        setQuestionsMultiple(data?.questionsMultipleChoice);
        console.log(questionsMultiple);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  }, [prop1]); // Run the effect whenever prop1 changes
   console.log(exam);

   /////edit question

   const handleEditLongQuestion = (question: QuestionLongResponseInterface) => {
    setEditedLongQuestion(question);
  };
  
  const handleEditMultipleQuestion = (question: QuestionMultipleChoiceInterface) => {
    setEditedMultipleQuestion(question);
  };
  
  const handleSaveLongQuestion = (question: QuestionLongResponseInterface) => {
    setQuestionsLong((prevQuestions) =>
      prevQuestions.map((q) => (q.id === question.id ? question : q))
    );
    const QuestionLong: QuestionLong = {
        idProfessor: question.idProfessor,
        questionText: question.questionText,
        points: question.points,
        expectedResponse: question.expectedResponse,
      };
      console.log(QuestionLong);
  
    setEditedLongQuestion(null);
  };
  
  const handleSaveMultipleQuestion = (question: QuestionMultipleChoiceInterface) => {
    const updatedQuestion: QuestionMultipleChoiceInterface = {
      ...question,
      // Update question properties if needed
    };
    console.log("ceva");
    console.log(updatedQuestion)
    // Send the updated question to the server
    
    // Update the client-side state
    setQuestionsMultiple(prevQuestions => {
      const updatedQuestions = prevQuestions.map(q =>
        q.id === question.id ? updatedQuestion : q
      );
      return updatedQuestions;
    });
  
    // Clear the edited question state
    setEditedMultipleQuestion(null);
  };
  

  const handleEditAnswerTextChange = (
    value: string,
    questionId: number,
    answerIndex: number
  ) => {
    setEditedMultipleQuestion((prevQuestion) => {
      if (!prevQuestion) return null;
  
      const updatedAnswers = prevQuestion.answersQuestion.map((answer, index) =>
        index === answerIndex ? { ...answer, answerText: value } : answer
      );
  
      return {
        ...prevQuestion,
        answersQuestion: updatedAnswers,
      };
    });
  };
  
  const handleEditAnswerCorrectChange = (
    checked: boolean,
    questionId: number,
    answerIndex: number
  ) => {
    setEditedMultipleQuestion((prevQuestion) => {
      if (!prevQuestion) return null;
  
      const updatedAnswers = prevQuestion.answersQuestion.map((answer, index) =>
        index === answerIndex ? { ...answer, correct: checked } : answer
      );
  
      return {
        ...prevQuestion,
        answersQuestion: updatedAnswers,
      };
    });
  };
  
  
  const handleDeleteAnswer = (questionId: number, answerId: number): void => {
  setQuestionsMultiple((prevQuestions) => {
    return prevQuestions.map((question) => {
      if (question.id === questionId) {
        const updatedAnswers = question.answersQuestion.filter(
          (answer) => answer.id !== answerId
        );

        // Update editedMultipleQuestion if it matches the deleted question
        if (
          editedMultipleQuestion &&
          editedMultipleQuestion.id === questionId
        ) {
          const updatedQuestion: QuestionMultipleChoiceInterface = {
            ...editedMultipleQuestion,
            answersQuestion: updatedAnswers,
          };
          setEditedMultipleQuestion(updatedQuestion);
        }

        return {
          ...question,
          answersQuestion: updatedAnswers,
        };
      }
      return question;
    });
  });
};
  const handleAddAnswer = (questionId: number) => {
    setEditedMultipleQuestion((prevQuestion) => {
      if (!prevQuestion) return null;
  
      const newAnswer: AnswerInterface = {
        id: Date.now(),
        idQuestion: questionId,
        answerText: 'new Answer',
        correct: false,
      };
  
      const updatedAnswers = [...prevQuestion.answersQuestion, newAnswer];
  
      const updatedQuestion: QuestionMultipleChoiceInterface = {
        ...prevQuestion,
        answersQuestion: updatedAnswers,
      };
  
      setEditedMultipleQuestion(updatedQuestion);
  
      return updatedQuestion;
    });
  };
  const handleDelete = async (idQuestion: number) => {
    try {
      const response = await fetch(`http://localhost:8192/questionExam/delete/idQuestion=${idQuestion}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Question deleted successfully');
  
        // Remove the deleted question from the state
        setQuestionsMultiple((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== idQuestion)
        );
      } else {
        console.log('Failed to delete question');
        // Handle the error case
      }
    } catch (error) {
      console.log('Error occurred while deleting question:', error);
      // Handle any errors that occurred during the fetch request
    }
  };
   ///question 
   const [questionsMultipleChoice, setQuestionsMultipleChoice] = useState<MultipleChoice[]>([]);
   const [questionsLongResponse, setQuestionsLongResponse] = useState<LongResponse[]>([]); 
   const lastQuestionRef = useRef<HTMLDivElement>(null);
   const lastLongResponseRef = useRef<HTMLDivElement>(null);
   const addQuestionLong = () => {
       const newQuestion: LongResponse = {
           idProfessor: exam?.idProfessor || 52,
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
    setQuestionsMultipleChoice((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const newAnswer: MultipleChoiceAnswers = {
        answerText: "",
        correct: false,
      };
      const answersQuestion = newQuestions[questionIndex].answersQuestion;
      const isAnswerAlreadyAdded = answersQuestion.some((answer) => answer.answerText === newAnswer.answerText);
      if (!isAnswerAlreadyAdded) {
        answersQuestion.push(newAnswer);
      }
      console.log(newQuestions);
      return newQuestions;
    });
  };
  

   const [isQuestionTextChangeValid, setQuestionTextChangeValid] = useState(true);
   const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
       const { value } = event.target;
       setQuestionsMultipleChoice((prevQuestions) => {
           const newQuestions = [...prevQuestions];
           newQuestions[questionIndex].questionText = event.target.value;
           if (newQuestions[questionIndex].questionText.length === 0)
               setQuestionTextChangeValid(false);
           else
               setQuestionTextChangeValid(true);
           return newQuestions;
       });

   };

   const [isQuestionTextLongValid, setQuestionTextLongValid] = useState(true);
   const handleQuestionTextChangeLong = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
       setQuestionsLongResponse((prevQuestions) => {
           const newQuestions = [...prevQuestions];
           newQuestions[questionIndex].questionText = event.target.value;
           if (newQuestions[questionIndex].questionText.length === 0)
               setQuestionTextLongValid(false);
           else
               setQuestionTextLongValid(true);
           return newQuestions;
       });
   };

   const [isAnswerTextValid, setAnswerTextValid] = useState(true);
   const handleAnswerTextChange = (
       event: React.ChangeEvent<HTMLInputElement>,
       questionIndex: number,
       answerIndex: number
   ) => {
       setQuestionsMultipleChoice((prevQuestions) => {
           const newQuestions = [...prevQuestions];
           newQuestions[questionIndex].answersQuestion[answerIndex].answerText = event.target.value;
           if (newQuestions[questionIndex].answersQuestion[answerIndex].answerText.length === 0)
               setAnswerTextValid(false);
           else
               setAnswerTextValid(true);
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
   const handleSubmit = () => {
       
       questionsMultipleChoice.forEach((question) => {
         const url = `http://localhost:8192/questionExam/multipleChoice/create/idExam=${exam?.id}`;
         const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(question),
         };
     
         fetch(url, requestOptions)
           .then((response) => {
             if (!response.ok) {
               throw new Error('Failed to create multiple-choice question');
             }
             return response.json();
           })
           .then((data) => {
             // Handle the response data if needed
             console.log('Multiple-choice question created:', data);
           })
           .catch((error) => {
             // Handle any errors
             console.error('Error creating multiple-choice question:', error);
           });
       });
       questionsLongResponse.forEach((question) => {
           const url = `http://localhost:8192/questionExam/longResponse/create/idExam=${exam?.id}`;
           const requestOptions = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(question),
           };
       
           fetch(url, requestOptions)
             .then((response) => {
               if (!response.ok) {
                 throw new Error('Failed to create long response question');
               }
               return response.json();
             })
             .then((data) => {
               // Handle the response data if needed
               console.log('Long response question created:', data);
             
             })
             .catch((error) => {
               console.error('Error creating long response question:', error);
             });
             
         });
         questionsLong.forEach((question) => 
         {
          fetch(`http://localhost:8192/questionExam/longResponse/update/idQuestion=${question.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(question),
          })
            .then(response => {
              if (response.ok) {
                console.log('Question saved successfully!');
              } else {
                throw new Error('Failed to save question.');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
             
         });
         questionsMultiple.forEach((question) =>
         {
          fetch(`http://localhost:8192/questionExam/multipleChoice/update/idQuestion=${question.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    })
      .then(response => {
        if (response.ok) {
          console.log('Question saved successfully!');
        } else {
          throw new Error('Failed to save question.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
       };
   ///select 
   const SelectEvaluationType: React.FC<{ onSelectEvaluationType: (evaluationType: string) => void; examType: number | undefined; }> = ({ onSelectEvaluationType, examType }) => {
    const [selectedEvaluationType, setSelectedEvaluationType] = useState<string | null>(null);
  
    const handleEvaluationTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const evaluationType = event.target.value;
      console.log(evaluationType);
      if(exam)
      if (evaluationType === 'Option 1') {
        exam.evaluationType = 1;
      } else if (evaluationType === 'Option 2') {
        exam.evaluationType = 2;
      } else {
        exam.evaluationType = 0;
      }
      setSelectedEvaluationType(evaluationType);
      onSelectEvaluationType(evaluationType);
    };
  
    return (
      <div className={styles.evaluationContainer}>
        <select value={selectedEvaluationType ?? ''} onChange={handleEvaluationTypeSelect}>
          <option className={styles.evaluationOption} value="" disabled>
            {examType === 0 ? 'Perfect match' :examType === 1 ?  "One wrong answer cancels one correct answer" : "Two wrong answers cancel one correct answer" }
                </option>
                <option className={styles.evaluationOption} value="Perfect match">
                    Perfect match
                </option>
                <option className={styles.evaluationOption} value="Option 1">
                    One wrong answer cancels one correct answer
                </option>
                <option className={styles.evaluationOption} value="Option 2">
                    Two wrong answers cancel one correct answer
                </option>
            </select>
        </div>
    );
}
     
   ///exam

   const [time, setTime] = useState<number>(0);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState<string>('');
    const [evaluationType, setEvaluationType] = useState<string>('');

    const handleExamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedName = event.target.value;
       
      };
      const [examTitle, setExamTitle] = useState('');
    
      const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (exam) {
          const time = parseInt(event.target.value, 10); // Parse the value as a number
          if(time>0){
          setExam({ ...exam, timeExam: time });
        }
        else 
        {
         console.log('nimc');
        }
    }
      };
      const handleExamDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDate = event.target.value;
        if (exam) {
          // Create a new exam object with the updated date
          const updatedExam = {
            ...exam,
            date: inputDate,
          };
      
          // Update the state with the modified exam
          setExam(updatedExam);
          console.log(exam);
        }
      };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(exam)
        setExam({ ...exam, title: event.target.value });
      };
      const handleEvaluationTypeSelect = (evaluationType: string) => {
        setEvaluationType(evaluationType);
    };
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
     console.log(hours);
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    
 
   
        const handleSave = () => {
            console.log("save");
            console.log(exam);
            if (exam) {
              const examData: ExamData = {
                id: exam.id,
                title: exam.title,
                date: exam.date,
                timeExam: exam.timeExam,
                evaluationType: exam.evaluationType
              };
          
              const fetchExamData = async () => {
                try {
                  const response = await fetch(`http://localhost:8192/exam/update/idExam=${exam.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(examData)
                  });
                  if (response.ok) {
                    const responseData: ExamData = await response.json();
                    console.log(responseData);
                  } else {
                    console.log('Error:', response.status);
                  }
                } catch (error) {
                  console.log('Error:', error);
                }
              };
              handleSubmit();
              // Call the fetchExamData function to initiate the fetch
              fetchExamData();
              setTimeout(() => {
             window.location.reload();
              }, 2000);
            }
          };
      
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <div className={styles['body--content']}>
                <div className={styles['body--title']}>
                       Edit your exam
                </div>
                <div onClick={handleSave} > <ButtonSaveExit/> </div> 
              
            </div>
                <div className={styles['body--details'] }>
                        <div className={styles['body--subtitle--container2']}>
                        
                        <SelectEvaluationType onSelectEvaluationType={handleEvaluationTypeSelect} examType={exam?.evaluationType} />
                        </div>
                        <input
                            type="text"
                            value={exam?.title}
                            onChange={handleTitleChange}
                            placeholder="Enter exam title"
                            className={styles['exam-name-input']}
                        />
                        <input
                            type="number"
                            step="any"
                            onChange={handleTimeChange}
                            value={exam?.timeExam}
                            className={styles['time-input']}
                           
                        />
                      
  


<input
  type="datetime-local"
  className={styles['date-input']}
  onChange={handleExamDateChange}
  value={exam ? formatDate(exam.date) : ''}
/>

                    </div>
    <div className={styles['questions-container']}>
        {questionsLong.map((question) =>  (
            <div key={question.id} className={styles.questi}>
               <h3 className={styles.questionTitle}>
         {editedLongQuestion && editedLongQuestion.id === question.id ? (
        <>
          <input
            type="text"
            value={editedLongQuestion.questionText}
            onChange={(e) =>
              setEditedLongQuestion((prevState) => ({
                ...prevState!,
                questionText: e.target.value,
              }))
            }
              
          
          />
          </>
      ) : (
        <>
          {question.questionText}
        </>
      )
      }
      {!editedLongQuestion || editedLongQuestion.id !== question.id ? (
        <><button
                            className={styles.delete}
                            onClick={() => handleEditLongQuestion(question)}
                        >
                            Edit
                        </button>
                        <button className={styles.delete} onClick={() => handleDelete(question.id)}>delete</button>

                        <div className={styles['points'] }> Points: {question.points} </div>
                        </>

      ) : (
        <><button
                                className={styles.delete}
                                onClick={() => handleSaveLongQuestion(editedLongQuestion)}
                            >
                                Save
                            </button>
                            <button className={styles.delete} onClick={() => handleDelete(question.id)}>delete</button>

                            <div className={styles['points'] }> Points:
                            <input
                            className={styles.inp}
            type="number"
            value={editedLongQuestion.points}
            onChange={(e) =>
              setEditedLongQuestion((prevState) => ({
                ...prevState!,
                points: parseFloat(e.target.value),
              }))
            }
          />
          </div>
                            </>
      )}
                        </h3>
                        <ul className={styles.ull}>
                        <li className={styles['answer']}>
                        {editedLongQuestion && editedLongQuestion.id === question.id ? (
  <>
 
    <input
      type="text"
      value={editedLongQuestion.expectedResponse}
      className={styles.resplong}
      onChange={(e) =>
        setEditedLongQuestion((prevState) => ({
          ...prevState!,
          expectedResponse: e.target.value,
        }))
      }
    />
  </>
) : (
  <>
    {question.expectedResponse}
    
  </>)
}
              </li> 
                 </ul> 
                     </div>
                     
))}</div>
                    <div className={styles['questions-container']}>
               
{questionsMultiple.map((question) => (
  <div key={question.id} className={styles.questi}>
    <h3 className={styles.questionTitle}>
      {editedMultipleQuestion && editedMultipleQuestion.id === question.id ? (
        <>
          <input
            type="text"
            value={editedMultipleQuestion.questionText}
            onChange={(e) =>
              setEditedMultipleQuestion((prevState) => ({
                ...prevState!,
                questionText: e.target.value,
              }))
            }
          />
        </>
      ) : (
        <>
          {question.questionText}
        </>
      )}
      {!editedMultipleQuestion || editedMultipleQuestion.id !== question.id ? (
        <>
          <button
            className={styles.delete}
            onClick={() => handleEditMultipleQuestion(question)}
          >
            Edit
          </button>
          <button className={styles.delete} onClick={() => handleDelete(question.id)}>delete</button>
          <div className={styles['points']}> Points: {question.points} </div>
        </>
      ) : (
        <>
          <button
            className={styles.delete}
            onClick={() => handleSaveMultipleQuestion(editedMultipleQuestion)}
          >
            Save
          </button>
          <button className={styles.delete} onClick={() => handleDelete(question.id)}>delete</button>
          <div className={styles['points']}>
            Points:
            <input
              type="number"
              value={editedMultipleQuestion.points}
              onChange={(e) =>
                setEditedMultipleQuestion((prevState) => ({
                  ...prevState!,
                  points: parseFloat(e.target.value),
                }))
              }
            />
          </div>
        </>
      )}
    </h3>
    <ul className={styles.ull}>
  {editedMultipleQuestion ? (
    <>
      {editedMultipleQuestion.answersQuestion.map((answer, index) => (
        <li key={answer.id} className={styles['answer']}>
          {editedMultipleQuestion && editedMultipleQuestion.id === question.id ? (
            <>
              <input
                type="text"
                className={styles.answw}
                value={
                  editedMultipleQuestion && editedMultipleQuestion.id === question.id
                    ? editedMultipleQuestion.answersQuestion[index].answerText
                    : answer.answerText
                }
                onChange={(e) =>
                  handleEditAnswerTextChange(e.target.value, question.id, index)
                }
              />
              <input
                type="checkbox"
                checked={
                  editedMultipleQuestion && editedMultipleQuestion.id === question.id
                    ? editedMultipleQuestion.answersQuestion[index].correct
                    : answer.correct
                }
                onChange={(e) =>
                  handleEditAnswerCorrectChange(e.target.checked, question.id, index)
                }
              />
              <button className={styles.deleteAnswer}
                onClick={() =>
                  handleDeleteAnswer(
                    editedMultipleQuestion.id,
                    editedMultipleQuestion.answersQuestion[index].id
                  )
                }
              >
                Delete
              </button>
            </>
          ) : (
            <>
              {answer.answerText}
            </>
          )}
        </li>
      ))}
      {editedMultipleQuestion && editedMultipleQuestion.id === question.id && (
        <button  className={ styles.addAnswer} onClick={() => handleAddAnswer(question.id)}>Add Answer</button>
      )}
    </>
  ) : (
    // Render the answers from question.answersQuestion if editedMultipleQuestion is null
    <>
      {question.answersQuestion.map((answer, index) => (
       <li key={answer.id} className={answer.correct ? styles['correct_answer'] : styles['answer']}>
          {answer.answerText}
          {/* Render other details */}
        </li>
      ))}
    </>
  )}
</ul>

    
  </div>
))}
</div>
                   
<>
 <form>
           {questionsMultipleChoice.map((question, questionIndex) => (
                        <div key={questionIndex} ref={questionIndex === questionsMultipleChoice.length - 1 ? lastQuestionRef : null}>
                            <div className={styles['box']}>
                                <Header
                                    point={question.points.toString()}
                                    setPoint={(newPoints) => setPointMultipleChoice(questionIndex, Number(newPoints))}
                                />
                                {question.points === 0 && (
                                    <div className={styles['error-message-points']}>Attention, the number of points is 0!</div>
                                )}
                                {question.questionText.length === 0 && (
                                    <div className={styles['error-message-quest']}>Please enter a question.</div>
                                )}
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
                                            {answer.answerText.length === 0 && (
                                                <div className={styles['error-message-text-answer']}>Please enter an answer choice.</div>
                                            )}
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
                                    {question.answersQuestion.length === 0 && (
                                        <div className={styles['error-message-answer']}>Please add at least one answer.</div>
                                    )}
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
                                {question.points === 0 && (
                                    <div className={styles['error-message-points']}>Attention, the number of points is 0!</div>
                                )}
                                {question.questionText.length === 0 && (
                                    <div className={styles['error-message-quest']}>Please enter a question.</div>
                                )}
                                <input
                                    type="text"
                                    value={question.questionText}
                                    placeholder="Type question here"
                                    className={styles.quest}
                                    onChange={(event) => handleQuestionTextChangeLong(event, questionIndex)}
                                />
                                
                                {question.expectedResponse.length === 0 && (
                                    <div className={styles['error-message-answer']}> Please add the expected answer.</div>
                                )}
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
             
            </>
            
            </body>
        </>
    );
}

export default EditQuestion;