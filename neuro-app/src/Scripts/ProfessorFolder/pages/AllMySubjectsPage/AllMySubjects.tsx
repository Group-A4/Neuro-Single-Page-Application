import React, { useEffect, useState, } from 'react'
import styles from './Body.module.css'
import photo_option from './option.png';
import Scroll from '../../components/ScrollComp/Scroll';
import ButtonAddCourse from '../../components/buttonAddCourse/ButtonAddCourse';
import Nav from '../../components/nav/Nav';
import Lectures from './Lectures';

interface Course {
    id: number,
    title: string,
    year: number
    semester: number,
    credits: number
}

const SelectCourse: React.FC<{ onSelectCourse: (id: number) => void }> = ({ onSelectCourse }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch("http://localhost:8192/courses/professor=52");
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
                All my subjects
            </div>
            <div>
                <div className={styles['body--subtitle--container']}>
                    <div className={styles['selects']}>
                        <SelectCourse onSelectCourse={handleCourseSelect} />
                    </div>
                </div>
                <Lectures idCourse={idC} />
                <div className={styles['button-position']}>
                    <ButtonAddCourse idCourse={idC} />
                </div>
            </div>
        </>
    );
}

const AllMySubjects: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>
        </>
    );
}

export default AllMySubjects;