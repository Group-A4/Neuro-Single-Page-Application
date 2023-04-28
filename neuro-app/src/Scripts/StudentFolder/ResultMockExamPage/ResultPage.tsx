import React from 'react'
import Nav from '../NavBarStudent/Nav';
import styles from './Body.module.css';
import { Link } from 'react-router-dom';
import CongratsIcon from "./Images/fireworks.svg";
import ButtonViewMaterials from './ButtonViewAnswers';
import ButtonTakeAnotherExam from './ButtonTakeAnotherExam';
import Message from './MessageBox';

const Body: React.FC<{}> = () => {
    return (

        <>
            <div className={styles['body--title']}>
                This mock exam has ended
            </div>        

            <div className={styles['body--subtitle']}>
                <p className={styles['text1']}> Congratulations! Your score is  </p>   
                <p className={styles['text2']}> 9/10 </p>
                <img className={styles['icon']} src={CongratsIcon} alt="Image" />
            </div>

            <div className={styles['body--buttons']}>
                <ButtonViewMaterials />
                <ButtonTakeAnotherExam />
            </div>

            <div className={styles['message--box']}>
            <Message />
            </div>
        </>
    )
}

const MockExamResult: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default MockExamResult;