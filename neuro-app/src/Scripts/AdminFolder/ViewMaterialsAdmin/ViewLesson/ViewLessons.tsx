import React from 'react';
import Nav from 'Scripts/AdminFolder/NavBarAdmin';
import styles from './Body.css';
import { Link } from 'react-router-dom';


const ViewLessonMaterials: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <body className={styles['body']}>
                <div className={styles['body--text'] }>
                    View lesson materials
                </div>

                <div className={styles['body--content']}>
                   
                </div>
                
            </body>

        </>
    );
}

export default ViewLessonMaterials;