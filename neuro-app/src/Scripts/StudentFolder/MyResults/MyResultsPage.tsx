import React from 'react'
import styles from './Body.module.css';
import Nav from '../NavBarStudent/Nav';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Body: React.FC<{}> = () => {

    const navigate = useNavigate();
    const goToTakeExam = () => {
        navigate('/QuestionMockExam'); 
      };

    return (
        <>
            <div className={styles['body--container']}>
                <div className={styles['column']}>
                    <div className={styles['body--title']}>
                        My exam scores
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['course-container--header']}>
                        <div className={styles['code--container']}>
                            Code
                        </div>
                        <div className={styles['exam--container']}>
                            Examen
                        </div>
                        <div className={styles['score--container']}>
                            Score
                        </div>
                        <div className={styles['button--container']}></div>
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['body--line']}></div>
                </div>

                <div className={styles['course-container']}>
                    <div className={styles['code--container']}>
                        45367
                    </div>
                    <div className={styles['exam--container']}>
                        Subject title
                    </div>
                    <div className={styles['score--container']}>
                        0.00
                    </div>
                    <div className={styles['button--container']}>
                        <button onClick={goToTakeExam}>Inspect My Exam Answers</button>
                    </div>
                    
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['code--container']}>
                        23527
                    </div>
                    <div className={styles['exam--container']}>
                        Subject title
                    </div>
                    <div className={styles['score--container']}>
                        0.00
                    </div>
                    <div className={styles['button--container']}>
                        <button onClick={goToTakeExam}>Inspect My Exam Answers</button>
                    </div>
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['code--container']}>
                        34567
                    </div>
                    <div className={styles['exam--container']}>
                        Subject title
                    </div>
                    <div className={styles['score--container']}>
                        0.00
                    </div>
                    <div className={styles['button--container']}>
                        <button onClick={goToTakeExam}>Inspect My Exam Answers</button>
                    </div>
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['code--container']}>
                        78969
                    </div>
                    <div className={styles['exam--container']}>
                        Subject title
                    </div>
                    <div className={styles['score--container']}>
                        0.00
                    </div>
                    <div className={styles['button--container']}>
                        <button onClick={goToTakeExam}>Inspect My Exam Answers</button>
                    </div>
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['code--container']}>
                        45678
                    </div>
                    <div className={styles['exam--container']}>
                        Subject title
                    </div>
                    <div className={styles['score--container']}>
                        0.00
                    </div>
                    <div className={styles['button--container']}>
                        <button onClick={goToTakeExam}>Inspect My Exam Answers</button>
                    </div>
                </div>
            </div>
        </>
    )
}


const MyResults: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['Body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default MyResults;