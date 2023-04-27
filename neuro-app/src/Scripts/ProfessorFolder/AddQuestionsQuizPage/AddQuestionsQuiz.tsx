import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css'
import CourseDropDown from './CourseDropDown';
import SectionDropDown from './SectionDropDown';
import Button from './Button';
// import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>

            <div className={styles['textbox']}>
                Course and section selection
            </div>

            <div className={styles['body--second_text']}>
                Select the course and the section you want the Quiz question to be part of.
            </div>

            <div className={styles['butoane']}>
                <CourseDropDown />
                <SectionDropDown />
            </div>

            <Button />
        </body>

    )
}


const AddQuestionsQuizz: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <Body/>
        </>
    );
}

export default AddQuestionsQuizz;