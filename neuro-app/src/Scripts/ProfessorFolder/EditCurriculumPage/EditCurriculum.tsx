import React from 'react'
import Nav from '../NavBarProfessor/Nav';
import styles from './Body.module.css'
import { Link } from 'react-router-dom';


const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>
            <div className={styles['body--text']}>
                Curriculum
            </div>

            <p className={styles['body--explication']}>
                To attach materials to a lesson, click on it or click add materials
            </p>

            <div className={styles['body--section--container']}>

                <div className={styles['body--text--section']}>
                    First section
                </div>

                <div className={styles['body--lesson--container']}>
                    <div className={styles['body--text--lesson']}>
                        <Link to='/AddMaterialsLesson'>
                            First lesson
                        </Link>
                    </div>

                    <div className={styles['body--text--add_materials']}>
                        <Link to='/AddMaterialsLesson'>
                            Add materials
                        </Link>
                    </div>
                </div>


                <div className={styles['body--lesson--container']}>
                    <div className={styles['body--text--lesson']}>
                        <Link to='/AddMaterialsLesson'>
                            Second lesson
                        </Link>
                    </div>

                    <div className={styles['body--text--add_materials']}>
                        <Link to='/AddMaterialsLesson'>
                            Add materials
                        </Link>
                    </div>
                </div>
            </div >

            <div className={styles['body--section--container']}>

                <div className={styles['body--text--section']}>
                    Second section
                </div>

                <div className={styles['body--lesson--container']}>
                    <div className={styles['body--text--lesson']}>
                        <Link to='/AddMaterialsLesson'>
                            First lesson
                        </Link>
                    </div>

                    <div className={styles['body--text--add_materials']}>
                        <Link to='/AddMaterialsLesson'>
                            Add materials
                        </Link>
                    </div>
                </div>


                <div className={styles['body--lesson--container']}>
                    <div className={styles['body--text--lesson']}>
                        <Link to='/AddMaterialsLesson'>
                            Second lesson
                        </Link>
                    </div>

                    <div className={styles['body--text--add_materials']}>
                        <Link to='/AddMaterialsLesson'>
                            Add materials
                        </Link>
                    </div>
                </div>
            </div >

        </body>
    )
}

const EditCurriculum: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <Body/>
        </>
    );
}

export default EditCurriculum;