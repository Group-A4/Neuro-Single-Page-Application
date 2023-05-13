import React from 'react'
import Nav from '../NavBarStudent/Nav';
import styles from './ResultExamPage.module.css';

const Body: React.FC<{}> = () => {
    return (
        <>
            <div className={styles['title']}>
                This exam has ended!
            </div>        
        </>
    )
}

const ExamResult: React.FC<{}> = () => {
    return (
      <>
        <body className={styles["body"]}>
          <Nav />
          <Body />
        </body>
      </>
    );
}

export default ExamResult;