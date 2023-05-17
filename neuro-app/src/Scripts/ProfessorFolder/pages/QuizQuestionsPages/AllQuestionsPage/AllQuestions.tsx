import React, { useEffect } from 'react'
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
import Questions from './Questions';
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
interface Lecture {
        id: number,
        course: Course,
        title: string,
        description: string
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
const SelectLecture: React.FC<{ onSelectLecture: (id: number) => void; idCourse: number | null }> = ({
    onSelectLecture,
    idCourse,
  }) => {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);

    useEffect(() => {
      const fetchLectures = async () => {
        if (idCourse) {
          const response = await fetch(`http://localhost:8192/lectures/course_id=${idCourse}`);
          const data = await response.json();
          setLectures(data);
        }
      };
      fetchLectures();
    }, [idCourse]);
  
    const handleLecturesSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const lectureId = event.target.value !== "" ? parseInt(event.target.value) : null;
        setSelectedLectureId(lectureId);
        onSelectLecture(lectureId as number);
    };
  
    return (
      <div className={styles['subject-container']}>
        <select value={selectedLectureId ?? ''} onChange={handleLecturesSelect}>
          <option value="" disabled hidden>
            Lectures options
          </option>
          <option className={styles['subject-options']}value="">None</option>
          {lectures.map((lecture) => (
            <option
              className={styles['subject-options']}
              key={lecture.id}
              value={lecture.id}
            >
              {lecture.title}
            </option>
          ))}
        </select>
      </div>
     );
    };
          

const Body: React.FC<{}> = () => {
    const [idC, setIdC] = useState<number | null>(null);
    const [idL, setIdL] = useState<number | null>(null);

    const handleCourseSelect = (courseId: number) => {
        setIdC(courseId);
    };
    const handleLectureSelect = (LectureId: number) => {
        setIdL(LectureId);
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
          <SelectLecture idCourse={idC} onSelectLecture={handleLectureSelect} />
        </div>
               
            </div>

            <div className={styles['body--line']}></div>

            <div className={styles['container']}>
            <Questions idCourse={idC} idLecture={idL} />
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