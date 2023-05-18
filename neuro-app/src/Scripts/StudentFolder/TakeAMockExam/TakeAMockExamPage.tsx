import React, { useState, useEffect } from 'react';
import styles from './MockExam.module.css';
import Nav from '../NavBarStudent/Nav';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  year: number;
  semester: number;
  credits: number;
}

const Body: React.FC<{}> = () => {

    const navigate = useNavigate();
    const goToTakeExam = (courseId : number) => {
        navigate(`/QuestionMockExam/${courseId}`); 
      };

    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
       const fetchData = async () => {
        const response = await fetch('http://localhost:8192/courses/student=37');
        const data = await response.json();
        setCourses(data);
      };
      fetchData();
    }, []);

    return (
        <>
            <div className={styles['body--container']}>
                <div className={styles['column']}>
                    <div className={styles['body--title']}>
                            Let’s prepare you for exams!
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['body--subtitle']}>
                            {courses.length > 0 ? 'Subjects: ': 'Loading...'}
                    </div>
                </div>

                <div className={styles['column']}>
                    <div className={styles['body--line']}></div>
                </div>

                {courses.map(course => (
                  <div className={styles['course-container']} key={course.title}>
                    <div className={styles['course-title']}>
                        {course.title}
                    </div>
                    <button  onClick={() => goToTakeExam(course.id)}>Start</button>
                  </div>
                ))}
            </div>
        </>
    )
}


const TakeAMockExam: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['Body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default TakeAMockExam;
