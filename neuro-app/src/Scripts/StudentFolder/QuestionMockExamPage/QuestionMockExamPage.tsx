import React, { useState, useEffect } from 'react';
import Nav from '../NavBarStudent/Nav';
import  './QuestionMockExamPage.css';
import { Link } from 'react-router-dom';
import Frame from '../Components/Frame';

interface QuizQuestion {
    idCourse: number;
    idProfessor: number;
    questionText: string;
    answersQuestion: QuizAnswer[];
}

interface QuizAnswer {
    idQuestion: number;
    answerText: string;
    correct: boolean;
}

const Body: React.FC<{}> = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleChoiceSelect = (choice: string) => {
        // handle the user's choice here
    };

    function handleFinishMockExam ()  {
        // handle the user's finish exam here
    }



    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch('http://localhost:8192/quizz/course=4');
            const data = await response.json();
            setQuestions(data);
        };

        fetchQuestions();
    }, []);

    return (
        <div className="body">
            {currentQuestion ? (
                <div className='questionPart'>
                    <div className='questionQuery'> 
                        <h1 className='question'> {currentQuestionIndex+1}/{questions.length}  {currentQuestion.questionText} </h1>
                    </div>
                    
                    <div className='questionAnswers'>
                    <ul>
                        {currentQuestion.answersQuestion.map((answer, index) => (
                            <li key={index} className="choice">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="choice"
                                        value={answer.answerText}
                                        onChange={() => handleChoiceSelect(answer.answerText)}
                                    />
                                    {answer.answerText}
                                </label>
                            </li>
                        ))}

                    </ul>
                    </div>

                </div>
            ) : (
                <Frame><div className='loading'>Loading questions...</div></Frame>
            )}
           
            <div className="button-container">

                <button className="button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous Question
                </button>
                 
              
                <button onClick={currentQuestionIndex < questions.length - 1 ?  handleNextQuestion : handleFinishMockExam} >
                   
                    {currentQuestionIndex === questions.length - 1 ? <Link to='/ResultMockExam'> Finish the mock exam</Link> : 'Next Question' }

                </button>
            
            </div>
        </div>

    );
}

function Question() {
    return (
        <body >
            <Nav />
            <Body />
        </body>
    );
}

export default Question;
