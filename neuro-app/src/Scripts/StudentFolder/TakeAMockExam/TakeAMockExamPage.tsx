import React from 'react'
import styles from './MockExam.module.css';
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
                            Let’s prepare you for exams!
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['body--subtitle']}>
                            Subject 
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['body--line']}></div>
                </div>

                <div className={styles['course-container']}>
                    <div className={styles['course-title']}>
                        Subject title 1
                    </div>
                    <button onClick={goToTakeExam}>Start</button>
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['course-title']}>
                        Subject title 2
                    </div>
                    <button onClick={goToTakeExam}>Start</button>
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['course-title']}>
                        Subject title 3
                    </div>
                    <button onClick={goToTakeExam}>Start</button>
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['course-title']}>
                        Subject title 4
                    </div>
                    <button onClick={goToTakeExam}>Start</button>
                </div>
                <div className={styles['course-container']}>
                    <div className={styles['course-title']}>
                        Subject title 5
                    </div>
                    <button onClick={goToTakeExam}>Start</button>
                </div>
            </div> 




            {/* <div>
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
            </div> */}
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