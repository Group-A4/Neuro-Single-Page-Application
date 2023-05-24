import React, { useState } from 'react';
import Frame from '../Components/Frame';
import Nav from '../NavBarStudent/Nav';
import styles from './CodeExamPage.module.css';
import { useNavigate } from 'react-router-dom';


const CodeExamPage: React.FC = () => {
  const [codeExam, setCodeExam] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeExam(event.target.value);
    setErrorMessage(''); 
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const apiUrl = 'http://localhost:8192/exam/code='+ codeExam +'/idStudent= 218';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      console.log(codeExam);

      if (response.status === 405) {
        setErrorMessage('You have already given this exam.');}
       else if (response.status === 404) {
         setErrorMessage('The exam code introduced is not valid.');
 
  } else {
    navigate(`/QuestionTextPage/${codeExam}`);
  }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    setCodeExam('');
  };

  return (
    <body>
      <Nav />
      <Frame>
         <div className={styles.content}>
            <h1 className={styles.examHeading}>Enter the exam code:</h1>
  <form onSubmit={handleSubmit}>
    <label>
      <input  className={styles.inputField} type="text" value={codeExam} onChange={handleChange} />
    </label>
    <button className={styles.submitButton} type="submit">Start The Exam!</button>
  </form>
  {errorMessage && <p className={styles.error}>{errorMessage}</p>}
</div>

      </Frame>
    </body>
  );
};

export default CodeExamPage;
