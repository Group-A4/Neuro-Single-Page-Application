import React from 'react'
import { useState } from "react";
import styles from './Button.module.css'
import Scroll from '../ScrollComp/Scroll';
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


    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].text = event.target.value;
        setQuestions(newQuestions);
    };


    const removeQuestion = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(questionIndex, 1);
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
                    {/* <div className={styles['body--container']}> */}
                        <div className={styles['course-container']}>
                            <div className={styles['course-title']}>
                                New course
                            </div>
                            <div className={styles['body--img']}>

                                <Scroll id_course="3"/>

                            </div>
                        <button type="button" onClick={() => removeQuestion(questionIndex)} className={styles.removeq}>R</button>
                        </div>  
                    {/* </div> */}


                </div>
            ))}
            <button type="button" className={styles.addquest} onClick={addQuestion}>Add course</button>
        </form>
    );
};

export default Formular;