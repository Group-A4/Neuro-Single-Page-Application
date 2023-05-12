import React from 'react';
import Frame from '../Components/Frame';
import Nav from '../NavBarStudent/Nav';
import styles from './CodeExamPage.module.css';
import CodeExamInput from '../Components/InputCode';


const CodeExamPage = () => {

   const handleSaveCodeExam = (codeExam: string) => {
    console.log(`Saving code exam: ${codeExam}`);
  };


  return (
    <body>
      <Nav/>
      <Frame> 
        <div className={styles.content}>
          <h1 className={styles.examHeading}>Enter the exam-codep: </h1>
          <CodeExamInput onSaveCodeExam={handleSaveCodeExam}  />
         </div> 
      </Frame>
    </body>
  );
}

export default CodeExamPage;
