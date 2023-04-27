import React from 'react'

import photo_edit_courses from './box_edit_courses.png';
import photo_add_questions from './box_add_questions.png';

import styles from './Body.module.css'
import { Link } from "react-router-dom";
import Nav from '../NavBarProfessor/Nav';



const Body: React.FC<{}> = () => {
    return (
    
      
            
        <div className={styles['body--img--container']}>
            
                <ul className={styles['link--image']} >
                    <Link to='/AllMyCourses'>
                        <img src={photo_edit_courses} alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    <Link to='/AddQuestionsQuiz'>
                        <img src={photo_add_questions} alt="" className={styles['body--img']} />
                    </Link>
                </ul>


            </div>
    

    
    )
  }

const UploadMaterials: React.FC<{}> = () =>  {
    return (
        <body className={styles['body']}>
            <Nav />
            <Body/>
        </body>
    );
}

export default UploadMaterials;