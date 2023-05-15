import React from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css'
import { Link } from 'react-router-dom';
import box_view from './box_view.png';
import box_quiz from './box_quiz.png';
import box_createExam from './create_exam.png';
import box_Exam from './exams.png';

const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>

            <div className={styles['body--img--container']}>

                <ul className={styles['link--image']} >
                    <Link to='/AllMySubjects'>
                        <img src={box_view} alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    <Link to='/AllQuestions'>
                        <img src={box_quiz} alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    <Link to='./CreateAnExam'>
                    <img src={box_createExam} alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    <Link to='./AllExams'>
                    <img src={box_Exam} alt="" className={styles['body--img']} />
                    </Link>
                </ul>

            </div>
        </body>


    )
}

function Home() {
    return (
        <body className={styles['body']}>
            <Nav />
            <Body />
        </body>
    );
}

export default Home;