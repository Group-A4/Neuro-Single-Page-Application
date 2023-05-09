import React from 'react'
import styles from './Body.module.css';
import Questions from './Questions';
import Quizz_question from './quizz_question';
import { Link } from "react-router-dom";
import ButtonSaveExit from '../../components/buttonSaveAndExit/ButtonAddQuestion';
import Nav from '../../Scripts/ProfessorFolder/components/nav/Nav';


const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--content']}>
                <div className={styles['body--title']}>
                        Subject title 
                </div>
                <Link to='/CreateAnExam'> <ButtonSaveExit/>  </Link> 
              
            </div>

              <div className={styles['container']}>
             <Questions/>
            </div>
        </>
    )
}


const EditQuestion: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <Body />
                <Quizz_question/>
            </body>


        </>
    );
}

export default EditQuestion;