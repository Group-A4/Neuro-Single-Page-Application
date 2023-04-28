import React, { useState } from 'react';
import Nav from '../NavBarStudent/Nav';
import  './QuestionMockExamPage.css';

interface Questions {
    id: number;
    question: string;
    choices: string[];
    answer: string;
}

const questions: Questions[] = [
    {
        id: 1,
        question: 'What is the capital of France?',
        choices: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris',
    },
    {
        id: 2,
        question: 'What is the largest country in the world by land area?',
        choices: ['Russia', 'Canada', 'China', 'USA'],
        answer: 'Russia',
    },
    // add more questions here
];

const Body: React.FC<{}> = () => {
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
    return (
        <div className="body">
            <div className='questionPart'>
                <div className='questionQuery'> 
                    <h1 className='question'> {currentQuestion.id}/{questions.length}  {currentQuestion.question} </h1>
                 </div>
                
                <div className='questionAnswers'>
                <ul>
                    {currentQuestion.choices.map((choice, index) => (
                        <li key={index} className="choice">
                            <label>
                                <input
                                    type="checkbox"
                                    name="choice"
                                    value={choice}
                                    onChange={() => handleChoiceSelect(choice)}
                                />
                                {choice}
                            </label>
                        </li>
                    ))}

                </ul>
                </div>

                </div>
            
           
            <div className="button-container">
                <button className="button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous Question
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                Next Question
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