import React, { useEffect } from 'react'
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
import Questions from './Questions';
import SelectSubject from '../../../components/SelectSubjectComp/SelectSubject';
import ButtonAddQuestion from '../../../components/buttonAddQuestion/ButtonAddQuestion';
import { Link } from 'react-router-dom';
import { useState } from "react";
interface Course 
    {
      title: string,
      year: number
      semester: number,
      credits: number
    }

//const idC:number;

const SelectCourse: React.FC<{}> = () => {
    const [selects] = useState();
    const [courses, setCourse]= useState<Course[]>([]);
    useEffect(() => {
        const fetchQuestions = async () => {
          const response = await fetch("http://localhost:8191/courses/professor=57");
          const data = await response.json();
          setCourse(data);
          console.log(data);
        };
        fetchQuestions();
      }, []);
     
    return (
        <div className={styles['subject-container']}>
            <select value={selects} onChange={() => {}}>
            { courses.length > 0 ? (
              courses.map((courses, index) => (
                <option className={styles['subject-options']} key={index}>
                    {courses.title}
                </option>
             ))): (
                <p>Loading...</p>
              )}             
            </select>
        </div>
    )
}


const Body: React.FC<{}> = () => {
    return (

        <>
            <div className={styles['body--text']}>
                <div className={styles['body--title']}>
                    Quiz questions
                </div>
                <div className={styles['body--button']}>
                    <Link to='/AddQuestion'>
                        <ButtonAddQuestion />
                    </Link>
                </div>
            </div>   

            <div className={styles['body--subtitle--container']}>
               
                <div className={styles['body--subtitle']}>
                    Subject 
                </div>
               <div className={styles['selects']}>
                    <SelectSubject />
                </div>
                <div className={styles['body--subtitle']}>
                    Course 
                    </div>
                    <div className={styles['selects']}>
                    <SelectCourse />
                </div>
                </div> 

            <div className={styles['body--line']}></div>  
            
            <div className={styles['container']}>
             <Questions/>
            </div>

        </>
    )
}


const AllQuestions: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <Body />
              
            </body>


        </>
    );
}

export default AllQuestions;