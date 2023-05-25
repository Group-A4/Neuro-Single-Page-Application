import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Nav from '../NavBarStudent/Nav';
import './QuestionMockExamPage.css';
import Frame from '../Components/Frame';

interface QuizQuestion {
  idCourse: number;
  idProfessor: number;
  questionText: string;
  answersQuestion: QuizAnswer[];
  score: string;
}

interface QuizAnswer {
  id: number;
  answerText: string;
  correct: boolean;
  chosen: boolean;
}

const Body: React.FC<{}> = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleChoiceSelect = (id: number) => {
    const newSelectedChoices = { ...selectedChoices };
    newSelectedChoices[id] = !newSelectedChoices[id];
    setSelectedChoices(newSelectedChoices);
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[currentQuestionIndex];
    currentQuestion.answersQuestion.forEach((answer) => {
      if (answer.id === id) {
        answer.chosen = !answer.chosen;
      }  
    });
    setQuestions(updatedQuestions);
  };

const handleFinishMockExam = () => {
  let totalQuestions = 0;
  let correctAnswers = 0;

  questions.forEach((question) => {
    let correctCount = 0;
    let chosenCount = 0;

    question.answersQuestion.forEach((answer) => {
      if (answer.correct) {
        correctCount++;
        if (answer.chosen) {
          chosenCount++;
        }
      } else if (answer.chosen) {
        chosenCount--;
      }
    });

    if (correctCount > 0) {
      totalQuestions++;
      correctAnswers += Math.max(chosenCount, 0) / correctCount;
    } else if (chosenCount === 0 && correctCount === 0) {
      totalQuestions++;
      correctAnswers += 0;
    } else if (chosenCount === 0) {
      totalQuestions++;
      correctAnswers += 1;
    }

    const score = correctCount === 0 ? 0 : Math.max(chosenCount, 0) / correctCount;
    question.score = score.toFixed(2);
  });

  const grade = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const formattedGrade = grade.toFixed(2);

  const state = {
    questions,
    grade: formattedGrade,
  };

  navigate('/ResultMockExam', { state });
};

  const apiUrl = 'http://localhost:8192/quizz/course=';
  const completeUrl = `${apiUrl}${courseId}`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(completeUrl);
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

 return (
    <div className="body">
      {loading ? (
        <Frame>
          <div className="loading">Loading questions...</div>
        </Frame>
      ) : currentQuestion ? (
        <div className="questionPart">
          <div className="questionQuery">
            <h1 className="question">
              {currentQuestionIndex + 1}/{questions.length} {currentQuestion.questionText}
            </h1>
          </div>

          <div className="questionAnswers">
            <ul>
              {currentQuestion.answersQuestion.map((answer) => (
                <li key={`${answer.id}`} className="choice">
                  <label>
                    <input
                      type="checkbox"
                      name={`choice-${answer.id}`}
                      checked={selectedChoices[answer.id] || false}
                      onChange={() => handleChoiceSelect(answer.id)}
                    />
                    {answer.answerText}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Frame>
          <div className="loading">No questions available.</div>
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
            <Link to="/ResultMockExam">Finish the mock exam</Link>
          ) : (
            'Next Question'
          )}
        </button>
      </div>
    </div>
  );
};
 

function Question() {
  return (
    <body>
      <Nav />
      <Body />
    </body>
  );
}

export default Question;
