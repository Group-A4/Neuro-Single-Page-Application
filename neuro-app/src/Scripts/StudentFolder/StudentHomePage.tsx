import React from 'react'
import Nav from '../../components/nav/Nav';
import styles from '../../CSS/Body.module.css';
import { Link } from "react-router-dom";


const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>

            <div className={styles['body--img--container']}>

                <ul className={styles['link--image']} >
                    <Link to='/UploadMaterials'>
                        <img src="./box_upload.png" alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    <Link to='/ViewMaterials'>
                        <img src="./box_view.png" alt="" className={styles['body--img']} />
                    </Link>
                </ul>

                <ul className={styles['link--image']} >
                    {/* <Link to='./UploadMaterials'> */}
                    <img src="./exams.png" alt="" className={styles['body--img']} />
                    {/* </Link> */}
                </ul>

                <ul className={styles['link--image']} >
                    {/* <Link to='./UploadMaterials'> */}
                    <img src="./create_exam.png" alt="" className={styles['body--img']} />
                    {/* </Link> */}
                </ul>

            </div>
        </body>


    )
}

const StudentHomePage: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <Body />
        </>
    );
}

// function Home() {
//     return (
//         <body className={styles['body']}>
//             <Nav />
//             <Body />
//         </body>
//     );
// }

export default StudentHomePage;