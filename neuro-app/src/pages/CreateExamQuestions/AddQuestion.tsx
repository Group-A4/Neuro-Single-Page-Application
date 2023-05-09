import React from 'react'
import styles from './Body.module.css';
import Quizz_question from './quizz_question';
 import { Link } from "react-router-dom";
import ButtonSaveExit from '../../components/buttonSaveAndExit/ButtonAddQuestion';
import Nav from '../../Scripts/ProfessorFolder/components/nav/Nav';

// import { Link } from 'react-router-dom';


const AddQuestion: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <div className={styles['body']}>
                <div className={styles['textBoxx'] }>
                    <div className={styles['textbox'] }>
                        Exam:   Subject title 1         
                    </div>
                    <Link to='/CreateAnExam'> <ButtonSaveExit/>  </Link> 
                </div>
               <Quizz_question/>

            </div>
            
        </>
    );
}

export default AddQuestion;