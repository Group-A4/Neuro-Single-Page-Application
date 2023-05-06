import React, { useState, useEffect } from 'react';
import Nav from '../NavBarStudent/Nav';
import '../QuestionMockExamPage/QuestionMockExamPage';
import { Link } from 'react-router-dom';
import Frame from '../Components/Frame';
import styles from './QuestionTextPage.module.css'

interface QuizQuestion {
    idCourse: number;
    idProfessor: number;
    questionText: string;
    answersQuestion?: QuizAnswer[]; // make answersQuestion optional
    isMultipleChoice: boolean; // add a flag to indicate if the question is a multiple choice question
}

interface QuizAnswer {
    idQuestion: number;
    answerText: string;
    correct: boolean;
}
const hardcodedQuestions: QuizQuestion[] = [

     {
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the formula for water?",
        answersQuestion: [],
        isMultipleChoice: false,
    },
    {
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the symbol for the element oxygen?",
        answersQuestion: [],
        isMultipleChoice: false,
    },
    {
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the capital of France?",
        answersQuestion: [
            {
                idQuestion: 1,
                answerText: "Paris",
                correct: true,
            },
            {
                idQuestion: 1,
                answerText: "Madrid",
                correct: false,
            },
            {
                idQuestion: 1,
                answerText: "Berlin",
                correct: false,
            },
            {
                idQuestion: 1,
                answerText: "London",
                correct: false,
            },
        ],
        isMultipleChoice: true,
    },
    {
        idCourse: 1,
        idProfessor: 1,
        questionText: "What is the largest ocean in the world?",
        answersQuestion: [
            {
                idQuestion: 2,
                answerText: "Atlantic Ocean",
                correct: false,
            },
            {
                idQuestion: 2,
                answerText: "Indian Ocean",
                correct: false,
            },
            {
                idQuestion: 2,
                answerText: "Arctic Ocean",
                correct: false,
            },
            {
                idQuestion: 2,
                answerText: "Pacific Ocean",
                correct: true,
            },
        ],
        isMultipleChoice: true,
    }
   
];


const Body: React.FC<{}> = () => {
    // const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [questions, setQuestions] = useState<QuizQuestion[]>(hardcodedQuestions);
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

    const handleInputAnswer = (answer: string) => {
        // handle the user's input answer here
    };

    function handleFinishMockExam() {
        // handle the user's finish exam here
    }

    // useEffect(() => {
    //     const fetchQuestions = async () => {
    //         const response = await fetch('http://localhost:8192/quizz/course=5');
    //         const data = await response.json();
    //         setQuestions(data);
    //     };

    //     fetchQuestions();
    // }, []);

    return (
        <div className="body">
            {currentQuestion ? (
                <div className="questionPart">
                    <div className="questionQuery">
                        <h1 className="question">
                            {currentQuestionIndex + 1}/{questions.length} {currentQuestion.questionText}
                        </h1>
                    </div>

                    {currentQuestion.isMultipleChoice ? (
                        <div className="questionAnswers">
                            <ul>
                                {currentQuestion.answersQuestion?.map((answer, index) => (
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
                    ) : (
                        <div className="questionAnswers">
                            <input
                                type="text"
                                name="answer"
                                placeholder="Type your answer here"
                                onChange={(e) => handleInputAnswer(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <Frame>
                    <div className="loading">Loading questions...</div>
                </Frame>
            )}

            <div className="button-container">
                <button
                    className="button"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous Question
                </button>

                <button
                    onClick={
                        currentQuestionIndex < questions.length - 1 ? handleNextQuestion : handleFinishMockExam
                    }
                >
                    {currentQuestionIndex === questions.length - 1 ? <Link to='/ResultExam'> Finish the mock exam</Link> : 'Next Question' }

                </button>
            
            </div>
        </div>

    );
}

function QuestionTextPage() {
    return (
        <body >
            <Nav />
            <Body />
        </body>
    );
}

export default QuestionTextPage;
