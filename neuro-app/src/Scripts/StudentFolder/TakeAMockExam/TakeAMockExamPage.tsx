import React from 'react'
import styles from './MockExam.module.css';
import Nav from '../NavBarStudent/Nav';
import { Link } from 'react-router-dom';


const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--text']}>
                Take a mock exam
            </div>        

            <div>
                <div className={styles['body--subtitle']}>
                    Subject
                </div>   
                <div className={styles['body--line']}></div>  

                <div className={styles['body--container']}>

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                                Subject title 1
                        </div> 
                        <div className={styles['course-edit']}>
                            <Link to='/QuestionMockExam'>
                                Start
                            </Link>
                        </div> 
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                        Subject title 2
                        </div>
                        <div className={styles['course-edit']}>
                            <Link to='/QuestionMockExam'>
                                Start
                            </Link>
                        </div> 
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Subject title 3
                        </div>
                        <div className={styles['course-edit']}>
                            <Link to='/QuestionMockExam'>
                                Start
                            </Link>
                        </div> 
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Subject title 4
                        </div>
                        <div className={styles['course-edit']}>
                            <Link to='/QuestionMockExam'>
                                Start
                            </Link>
                        </div> 
                    </div>  
                </div> 
            </div>
        </>
    )
}


const TakeAMockExam: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['Body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default TakeAMockExam;