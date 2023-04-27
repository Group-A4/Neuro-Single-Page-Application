import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css';
import Questions from './Questions';


const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--text']}>
                View quiz questions
            </div>
            
            <div className={styles['container']}>
                <div className={styles['body--explication']}>
                    Click on the lecture for which materials are associated.
                </div>
             <Questions/>
            </div>

        </>
    )
}


const ViewQuestionAnswer: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <Body />
              
            </body>


        </>
    );
}

export default ViewQuestionAnswer;