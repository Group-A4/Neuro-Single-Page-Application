import React from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css';
import Questions from './Questions';


const Body: React.FC<{}> = () => {
    return (

        <>
            <div className={styles['body--text']}>
               Subject title 1
            </div>
              <div className={styles['container']}>
             <Questions/>
            </div>
        </>
    )
}


const ViewExamAnswers: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <Body />
              
            </body>


        </>
    );
}

export default ViewExamAnswers;