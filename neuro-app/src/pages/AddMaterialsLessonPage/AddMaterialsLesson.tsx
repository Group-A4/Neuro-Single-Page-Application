import React from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css'
import Buttons from './Button';
// import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>
            <div className={styles['body--text']}>
                Add materials
            </div>

            <p className={styles['body--explication']}>
                Add content to your lecture.
            </p>

            <div className={styles['body--content']}>
                {/* TODO */}

            </div>

        </body>

    )
}

const AddMaterialsLesson: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <Body/>
            <Buttons />
        </>
    );
}

export default AddMaterialsLesson;