import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css'
import { Link } from "react-router-dom";

import photo_view_course_materials from './box_view_course_materials.png';
import photo_view_quiz from './box_view_quiz.png';

const Body: React.FC<{}> = () => {
    return (

        <div className={styles['body--img--container']}>

            <ul className={styles['link--image']} >
                <Link to='/ViewCourse'>
                    <img src={photo_view_course_materials} alt="" className={styles['body--img']} />
                </Link>
            </ul>

            <ul className={styles['link--image']} >
                <Link to='/ViewQuestions'>
                    <img src={photo_view_quiz} alt="" className={styles['body--img']} />
                </Link>
            </ul>


        </div>



    )
}

const ViewMaterials: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>
        </>
    );
}

export default ViewMaterials;