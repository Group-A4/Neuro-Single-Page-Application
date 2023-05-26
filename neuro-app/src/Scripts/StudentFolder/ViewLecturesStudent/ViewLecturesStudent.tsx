import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './ViewLecturesStudent.module.css';
import Nav from '../NavBarStudent/Nav';
import { useLocation } from 'react-router-dom';
import withAuth from '../../../WithAuth';


interface ViewLecture {
    idCourse: number;
    id: number;
    title: string;
    course: ViewCourse[];
    description: string;  
  }
  
interface ViewCourse {
    id: number;
    title: string;
    year: number;
    semester: number;
    credits: number;
  }


const Body: React.FC<{}> = () => {
    const location = useLocation();
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || '';

    const goToViewLectures = (lectureId : number) => {
        navigate('/ViewLectureMaterials',{state:{lectureId}});
      };

    const [lectures, setCourses] = useState<ViewLecture[]>([]);

    const apiUrl = 'http://localhost:8192/lectures/course_id=';
    const completeUrl = `${apiUrl}${courseId}`;

    useEffect(() => {
       const fetchData = async () => {
        const response = await fetch(completeUrl, 
            { headers: { 'Authorization': `Bearer ${token}` } });
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
                        View Lecture Materials
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['body--subtitle']}>
                            {lectures.length > 0 ? 'Lectures: ': 'Loading...'}
                    </div>
                </div>

                <div className={styles['column']}>
                    <div className={styles['body--line']}></div>
                </div>

                {lectures.map(lecture => (
                  <div className={styles['course-container']} key={lecture.title}>
                    <div className={styles['course-title']}>
                        {lecture.title}
                    </div>
                    <button  onClick={() => goToViewLectures(lecture.id)}>View</button>
                  </div>
                ))}
            </div>
        </>
    )
}


const ViewMaterialsStudent: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['Body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default withAuth(ViewMaterialsStudent, [2]);
