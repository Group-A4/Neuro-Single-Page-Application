import React from 'react'

import photo_upload from './box_upload.png';
import photo_view from './box_view.png';
import photo_exams from './exams.png';
import photo_create_exam from './create_exam.png';

import styles from './Body.module.css'
import { Link } from 'react-router-dom';
import Nav from '../NavBarProfessor/Nav';


const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>

            <div className={styles['body--img--container']}>

                <ul className={styles['link--image']} >
                    <Link to='/UploadMaterials'>
                        <img src={photo_upload} alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    <Link to='/ViewMaterials'>
                        <img src={photo_view} alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    {/* <Link to='./UploadMaterials'> */}
                    <img src={photo_exams} alt="" className={styles['body--img']} />
                    {/* </Link> */}
                </ul>

                <ul className={styles['link--image']} >
                    {/* <Link to='./UploadMaterials'> */}
                    <img src={photo_create_exam} alt="" className={styles['body--img']} />
                    {/* </Link> */}
                </ul>

            </div>
        </body>


    )
}

function Home() {
    return (
        <body className={styles['body']}>
            <Nav />
            <Body />
        </body>
    );
}

export default Home;