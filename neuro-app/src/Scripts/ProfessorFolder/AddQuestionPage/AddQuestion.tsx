import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css';
import Formular from './formular';
// import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

        <div className={styles['body']}>
            <div className={styles['textbox']}>
                Add questions for Quiz                
            </div>

            <div className={styles['body--second_text']}>
                Enter the question and the answer options, ticking the correct answers.             
            </div>
            
            <Formular />
        </div>

    )
}

const AddQuestion: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <Body />
        </>
    );
}

export default AddQuestion;