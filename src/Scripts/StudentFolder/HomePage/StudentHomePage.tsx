import React from 'react'

import photo_TakeAMockExam from './Images/BoxTakeAMockExam.png';
import photo_MyExamResult from './Images/BoxMyExamResult.png';
import photo_TakeAnExam from './Images/BoxTakeAnExam.png';
import photo_ViewMaterials from './Images/BoxViewMaterials.png';

import styles from '../../../CSS/Body.module.css'
// import { Link } from 'react-router-dom';
import Nav from '../NavBarStudent/Nav';


const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>

            <div className={styles['body--img--container']}>

                <ul className={styles['link--image']} >
                    {/* <Link to='/ViewMaterials'> */}
                        <img src={photo_ViewMaterials} alt="" className={styles['body--img']} />
                    {/* </Link> */}
                </ul>

                <ul className={styles['link--image']} >
                    {/* <Link to='/TakeAMockExam'> */}
                        <img src={photo_TakeAMockExam} alt="" className={styles['body--img']} />
                    {/* </Link> */}
                </ul>

                <ul className={styles['link--image']} >
                    {/* <Link to='./UploadMaterials'> */}
                    <img src={photo_TakeAnExam} alt="" className={styles['body--img']} />
                    {/* </Link> */}
                </ul>

                <ul className={styles['link--image']} >
                    {/* <Link to='./UploadMaterials'> */}
                    <img src={photo_MyExamResult} alt="" className={styles['body--img']} />
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