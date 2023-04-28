import React from 'react';
import Nav from '/ScriptsAdminFolder/NavBarAdmin';
import styles from './Body.css';
import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

        <>
            <div className={styles['body']}>
                <div className={styles['body--text']}>
                    Syllabus
                </div>

                <div className={styles['body--explication']}>
                    Click on the lesson for which materials are associated.
                </div>

                <div className={styles['body--section--container']}>
                
                    <div className={styles['body--text--section']}>
                            First section   
                    </div>   

                    <div className={styles['body--text--lecture']}>
                        <Link to='/ViewLesson'>
                            First lesson
                        </Link>
                        
                    </div>  
                    <div className={styles['body--text--lecture']}>
                        <Link to='/ViewLesson'>
                            Second lesson
                        </Link>
                        
                    </div>  
                </div >

                <div className={styles['body--section--container']}>

                    <div className={styles['body--text--section']}>
                        Second section
                    </div>
                    <div className={styles['body--text--lecture']}>
                        <Link to='/ViewLesson'>
                            First lesson
                        </Link>
                    </div>
                    <div className={styles['body--text--lecture']}>
                        <Link to='/ViewLesson'>
                            Second lesson
                        </Link>
                    </div>
                </div >
            </div>
        </>
    )
}


const Syllabus: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>


        </>
    );
}

export default Syllabus;