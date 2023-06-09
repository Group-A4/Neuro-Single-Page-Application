import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Nav from '../NavBarStudent/Nav';
import Frame from '../Components/Frame';
import withAuth from '../../../WithAuth';
import Exam from '../../ProfessorFolder/pages/AllExamsPage/ExamPage/Exam';
 

interface Exam {
  id: number;
  idCourse: number;
  idProfessor: number;
  title: string;
  date: string;
  timeExam: number;
  evaluationType: number;
  questionsMultipleChoice: MultipleChoiceQuestion[];
  questionsLongResponse: LongResponseQuestion[];
}

interface MultipleChoiceQuestion {
  id: number;
  idExam: number;
  idProfessor: number;
  questionText: string;
  points: number;
  answersQuestion: Answer[];
 }

interface Answer {
  id: number;
  idQuestion: number;
  answerText: string;
  correct: boolean;
}

interface LongResponseQuestion {
  id: number;
  idExam: number;
  idProfessor: number;
  questionText: string;
  points: number;
  expectedResponse: string;
 }

const Body: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { courseExam } = useParams<{ courseExam: string }>();
  const [examData, setExamData] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: boolean }>({});
  const [inputAnswers, setInputAnswers] = useState<{ [key: number]: string }>({});
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem('utilizator') || '{}');
  const token = localStorage.getItem('token') || '';
  const [isDataFetched, setIsDataFetched] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8192/exam/code=${courseExam}/idStudent=${user.id}`;
         const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}`, } });
        const data = await response.json();

        setExamData(data);

        if (data && data.timeExam) {
            setRemainingTime(data.timeExam*60);  
         }
      } catch (error) {
        console.error('Error fetching exam data:', error);
      } finally{
          setIsDataFetched(true); 

      }
    };
    fetchData();
  }, [courseExam]);


useEffect(() => {
  if (isDataFetched) {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        const updatedTime = prevTime - 1;
         if (updatedTime <= 0) {
          clearInterval(timer);
          handleFinishMockExam();
          navigate('/ResultExam');
        }
        return updatedTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }
}, [isDataFetched, navigate, remainingTime]);




const handleChoiceSelect = (id: number) => {
  setExamData((prevData) => {
    if (prevData) {
      const currentQuestion = prevData.questionsMultipleChoice.find((question) =>
        question.answersQuestion.some((answer) => answer.id === id)
      );
      if (currentQuestion) {
        const updatedQuestions = prevData.questionsMultipleChoice.map((question) => {
          if (question.id === currentQuestion.id) {
            const updatedAnswers = question.answersQuestion.map((answer) => {
              if (answer.id === id) {
                return {
                  ...answer,
                  correct: !answer.correct,  
                };
              }
              return answer;
            });
            return {
              ...question,
              answersQuestion: updatedAnswers,
            };
          }
          return question;
        });
        return {
          ...prevData,
          questionsMultipleChoice: updatedQuestions,
        };
      }
    }
    return prevData;
  });
  setSelectedChoices((prevSelectedChoices) => ({
    ...prevSelectedChoices,
    [id]: !prevSelectedChoices[id], 
  }));
};

const handleInputAnswer = (answer: string, id: number) => {
  setExamData((prevData) => {
    if (prevData) {
      const updatedQuestions = prevData.questionsLongResponse.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            expectedResponse: answer,
          };
        }
        return question;
      });
      return {
        ...prevData,
        questionsLongResponse: updatedQuestions,
      };
    }
    return prevData;
  });
  setInputAnswers((prevInputAnswers) => ({
    ...prevInputAnswers,
    [id]: answer,
  }));
};



  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextQuestion = () => {

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };


const handleFinishMockExam = async () => {
  try {
    const apiUrl = `http://localhost:8192/exam/evaluate/idStudent=${user.id}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(examData),
    });

  
    if (response.ok) {
        console.log("Evaluation succeeded.");

    } else {
       console.error('Exam evaluation failed:', response.status);
     }
  } catch (error) {
    console.error('Error occurred while evaluating the exam:', error);
  }
};


const formatTime = (time: number) => {
   const hours = Math.floor(time / 60 / 60).toString().padStart(2, '0');
  const minutes = Math.floor((time / 60) % 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};




  if (!examData || !examData.questionsMultipleChoice) {
    return (
      <div className="body">
        <Frame>
          <div className="loading">Loading questions...</div>
        </Frame>
      </div>
    );
  }

  const questions: (MultipleChoiceQuestion | LongResponseQuestion)[] = [
    ...examData.questionsMultipleChoice,
    ...examData.questionsLongResponse,
  ];
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="body">
      <div className="timer">Remaining Time: {formatTime(remainingTime)}</div>

      {currentQuestion ? (
        <div className="questionPart">
          <div className="questionQuery">
            <h1 className="question">
              {currentQuestionIndex + 1}/{questions.length} {currentQuestion.questionText}
            </h1>
          </div>

          {currentQuestion.hasOwnProperty('answersQuestion') && (
            <div className="questionAnswers">
              <ul>
                {(currentQuestion as MultipleChoiceQuestion).answersQuestion.map(
                  (answer: Answer, index: number) => (
                    <li key={`${answer.id}`} className="choice">
                      <label>
                        <input
                          type="checkbox"
                          name={`choice-${answer.id}`}
                          checked={selectedChoices[answer.id]}
                          onChange={() => handleChoiceSelect(answer.id)}
                        />
                        {answer.answerText}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {!currentQuestion.hasOwnProperty('answersQuestion') && (
            <div className="questionAnswers">
              <input
                type="text"
                name="answer"
                placeholder="Type your answer here"
                value={inputAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleInputAnswer(e.target.value, currentQuestion.id)}
               />
            </div>
          )}
        </div>
      ) : (
        <Frame>
          <div className="loading">Loading questions...</div>
        </Frame>
      )}

      <div className="button-container1">
        <button
          className="button1"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button>

        <button
          className="button1"
          onClick={
            currentQuestionIndex < questions.length - 1 ? handleNextQuestion : handleFinishMockExam
          }
        >
          {currentQuestionIndex === questions.length - 1 ? (
            <Link to="/ResultExam">Finish the mock exam</Link>
          ) : (
            'Next Question'
          )}
        </button>
      </div>
    </div>
  );
};

function QuestionTextPage() {
  return (
    <body>
      <Nav />
      <Body />
    </body>
  );
}

export default withAuth(QuestionTextPage, [2]);
