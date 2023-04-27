import React from 'react'
import Nav from '../NavBarStudent/Nav';
import styles from './Body.module.css'
import { Link } from 'react-router-dom';
import CongratsIcon from "./Images/fireworks.svg";

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
            {/* <div className={styles['body--line']}></div>    */}
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