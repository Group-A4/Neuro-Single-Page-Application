import React, { useEffect } from 'react'
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
import Questions from './Questions';
import SelectSubject from '../../../components/SelectSubjectComp/SelectSubject';
import ButtonAddQuestion from '../../../components/buttonAddQuestion/ButtonAddQuestion';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { number } from 'yargs';
interface Course {
    id: number,
    title: string,
    year: number
    semester: number,
    credits: number
}

//const idC: number;

const SelectCourse: React.FC<{ onSelectCourse: (id: number) => void }> = ({ onSelectCourse }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch("http://localhost:8192/courses/professor=56");
            const data = await response.json();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    const handleCourseSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const courseId = parseInt(event.target.value);
        setSelectedCourseId(courseId);
        onSelectCourse(courseId);
    };

    return (
        <div className={styles['subject-container']}>
            <select value={selectedCourseId ?? ""} onChange={handleCourseSelect}>
                <option value="" disabled hidden>
                    Courses options
                </option>


                {courses.map((course) => (
                    <option
                        className={styles['subject-options']}
                        key={course.id}
                        value={course.id}
                    >
                        {course.title}
                    </option>
                ))}
            </select>
        </div>
    );
};


const Body: React.FC<{}> = () => {
    const [idC, setIdC] = useState<number | null>(null);

    const handleCourseSelect = (courseId: number) => {
        setIdC(courseId);
    };
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
                <div className={styles['selects']}>
                    <SelectCourse onSelectCourse={handleCourseSelect} />
                </div>
                <div className={styles['selects']}>
                    <SelectSubject />
                </div>

            </div>

            <div className={styles['body--line']}></div>

            <div className={styles['container']}>
                <Questions idCourse={idC} />
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