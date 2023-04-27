import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css'
import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--text']}>
                Course choice
            </div>

            <div className={styles['body--explication']}>
                Click on the course for which you want to view the quiz questions.
            </div>


            <div>
                <div className={styles['body--subtitle']}>
                    Course
                </div>
                <div className={styles['body--line']}></div>

                <div className={styles['body--container']}>

                    <div className={styles['course-container']}>
                 <Link to='/ViewQuestionAnswer'>     
                   <div className={styles['course-title']}> 
  
                            Course title 1
                        </div> </Link>
                    </div>

                    <div className={styles['course-container']}>
                    <Link to='/ViewQuestionAnswer'>
                        <div className={styles['course-title']}> 
                            Course title 2
                        </div>
                    </Link>
                    </div>

                    <div className={styles['course-container']}>
                    <Link to='/ViewQuestionAnswer'>
                        <div className={styles['course-title']}>
                            Course title 3
                        </div>
                    </Link>
                    </div>

                    <div className={styles['course-container']}>
                    <Link to='/ViewQuestionAnswer'>
                        <div className={styles['course-title']}>
                            Course title 4
                        </div>
                    </Link>

                    </div>
                </div>
            </div>
        </>
    )
}


const ViewQuestions: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>


        </>
    );
}

export default ViewQuestions;