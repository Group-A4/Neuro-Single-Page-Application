import React, { useState, useEffect } from 'react';
import styles from './ViewMaterials.module.css';
import Nav from '../NavBarStudent/Nav';
import { useNavigate } from 'react-router-dom';
import withAuth from '../../../WithAuth';

interface Course {
  id: number;
  title: string;
  year: number;
  semester: number;
  credits: number;
}

const Body: React.FC<{}> = () => {
    const navigate = useNavigate();
    const goToViewSubjects = (courseId: number) => {
        navigate(`/ViewLectures/${courseId}`);
    };

    const [isLoading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const user = JSON.parse(localStorage.getItem('utilizator') || '{}');
    const token = localStorage.getItem('token') || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8192/courses/student=${user.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 400) {
                    console.log('error');
                } else {
                    const data = await response.json();
                    setCourses(data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className={styles['body--container']}>
                <div className={styles['column']}>
                    <div className={styles['body--title']}>
                        View your subjects
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['body--subtitle']}>
                        { (courses.length > 0 ? 'Subjects: ' : 'Subjects:')}
                    </div>
                </div>

                <div className={styles['column']}>
                    <div className={styles['body--line']}></div>
                </div>


                {isLoading ? (
                <div className={styles["loading"]}>Loading...</div>
                ) : courses.length === 0 ? (
                <div className={styles["no-courses"]}>No subjects to show</div>
                ) : ( courses.map(course => (
                    <div className={styles['course-container']} key={course.title}>
                        <div className={styles['course-title']}>
                            {course.title}
                        </div>
                        <button onClick={() => goToViewSubjects(course.id)}>View</button>
                    </div>
                )))}

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
