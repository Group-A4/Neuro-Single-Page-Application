import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css'
import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--text']}>
                View courses
            </div>

            <div className={styles['body--explication']}>
                Click on the course for which you want to view the materials.
            </div>


            <div>
                <div className={styles['body--subtitle']}>
                    Course
                </div>
                <div className={styles['body--line']}></div>

                <div className={styles['body--container']}>

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            <Link to='/Syllabus'>
                                Course title 1
                            </Link>
                        </div>
                    </div>

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            <Link to='/Syllabus'>
                                Course title 2
                            </Link>
                        </div>

                    </div>

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            <Link to='/Syllabus'>
                                Course title 3
                            </Link>
                        </div>

                    </div>

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            <Link to='/Syllabus'>
                                Course title 4
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}


const ViewCourse: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>


        </>
    );
}

export default ViewCourse;