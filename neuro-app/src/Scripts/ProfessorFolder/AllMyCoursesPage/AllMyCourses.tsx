import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css'
import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--text']}>
                All my courses
            </div>        

            <div>
                <div className={styles['body--subtitle']}>
                    Course
                </div>   
                <div className={styles['body--line']}></div>  

                <div className={styles['body--container']}>

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course title 1
                        </div> 
                        <div className={styles['course-edit']}>
                            <Link to='/EditCurriculum'>
                                Edit curriculum
                            </Link>
                        </div> 
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course title 2
                        </div>
                        <div className={styles['course-edit']}>
                            <Link to='/EditCurriculum'>
                                Edit curriculum
                            </Link>
                        </div> 
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course title 3
                        </div>
                        <div className={styles['course-edit']}>
                            <Link to='/EditCurriculum'>
                                Edit curriculum
                            </Link>
                        </div> 
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course title 4
                        </div>
                        <div className={styles['course-edit']}>
                            <Link to='/EditCurriculum'>
                                Edit curriculum
                            </Link>
                        </div> 
                    </div>  
                </div> 
            </div>
        </>
    )
}


const AllMyCourses: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default AllMyCourses;