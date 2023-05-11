import React from 'react'
import Nav from '../NavBarStudent/Nav';
import styles from './ResultExamPage.module.css';
import { Link } from 'react-router-dom';
import CongratsIcon from "./Images/fireworks.svg";

const Body: React.FC<{}> = () => {
    return (

        <>
            <div className={styles['body--title']}>
                This exam has ended!
            </div>        
        </>
    )
}

const ExamResult: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>
        </>
    );
}

export default ExamResult;