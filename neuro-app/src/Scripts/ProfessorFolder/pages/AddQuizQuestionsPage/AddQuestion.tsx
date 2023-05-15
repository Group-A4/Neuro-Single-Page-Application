import React from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css';
import Quizz_question from './quizz_question';
import { Link } from "react-router-dom";
import ButtonSaveExit from '../../components/buttonSaveAndExit/ButtonAddQuestion';
import SelectCourse from '../../components/SelectCourseComp/SelectCourse';
import SelectSubject from '../../components/SelectSubjectComp/SelectSubject';
// import { Link } from 'react-router-dom';


const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--content']} >
        
                    <div className={styles['body--subtitle--container']}>
                        <div className={styles['selects']}>
                            <SelectCourse />
                        </div>
                        <div className={styles['selects']}>
                            <SelectSubject />
                        </div>

                    </div>
                
                
                
                {/* <Link to='/AllQuestions'>         
                    <button type="submit" className={styles['button--create']} >
                        Save and Exit
                    </button>     
                </Link> */}


            </div>
            <Quizz_question />


        </>
    )
}

const AddQuestion: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />

            </body>
        </>
    );
}

export default AddQuestion;