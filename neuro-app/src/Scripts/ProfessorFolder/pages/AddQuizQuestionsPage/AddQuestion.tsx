import React from 'react'
import styles from './Body.module.css';
import Quizz_question from './quizz_question';
 import { Link } from "react-router-dom";
import ButtonSaveExit from '../../components/buttonSaveAndExit/ButtonAddQuestion';
import Nav from '../../components/nav/Nav';
// import { Link } from 'react-router-dom';


const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--content']} >
                <div className={styles['body--title']}>
                        Course title
                </div>
                    <Link to='/AllQuestions'> <ButtonSaveExit />    </Link>

                
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
                <Body/>
            
            </body>
        </>
    );
}

export default AddQuestion;