import React from 'react'
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css'
// import { Link } from 'react-router-dom';


const ViewLessonMaterials: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <body className={styles['body']}>
                <div className={styles['body--text'] }>
                    View lecture materials
                </div>

                <div className={styles['body--content']}>
                    {/* TODO */}
                    Material
                </div>
                
            </body>

        </>
    );
}

export default ViewLessonMaterials;