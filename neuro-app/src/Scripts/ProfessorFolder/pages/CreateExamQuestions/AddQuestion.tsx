import React, { useEffect, useState, } from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css';
import Quizz_question from './quizz_question';
 import { Link } from "react-router-dom";
import ButtonSaveExit from '../../components/buttonSaveAndExit/ButtonAddQuestion';

interface Course {
    id: number,
    title: string,
    year: number
    semester: number,
    credits: number
}

interface UserData {

    id: number;
    idCourse: number;
    idProfessor: number;
    code: string;
    title: string;
    date: Date;
    timeExam: number;
    evaluationType: number;
}

const SelectCourse: React.FC<{ onSelectCourse: (id: number) => void }> = ({ onSelectCourse }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [examData, setExamData] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('http://localhost:8192/courses/professor=52');
            const data = await response.json();
            setCourses(data);
        };
        fetchCourses();

        const savedCourseId = localStorage.getItem('selectedCourseId');
        if (savedCourseId) {
            const courseId = parseInt(savedCourseId);
            setSelectedCourseId(courseId);
            onSelectCourse(courseId);
        }
    }, []);
    const handleCourseSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const courseId = parseInt(event.target.value);
        setSelectedCourseId(courseId);
        onSelectCourse(courseId);
        localStorage.setItem('selectedCourseId', String(courseId));
    };

    return (
        <>
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
        </>
    );
};

// const SelectEvaluationType: React.FC<{ onSelectEvaluationType: (evaluationType: number) => void }> = ({ onSelectEvaluationType }) => {
//     const [selectedEvaluationType, setSelectedEvaluationType] = useState<number | null>(null);

//     const handleEvaluationTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const evaluationType = parseInt(event.target.value);
//         setSelectedEvaluationType(evaluationType);
//         onSelectEvaluationType(evaluationType);
//     };

//     return (
//         <div className={styles['subject-container']}>
//             <select value={selectedEvaluationType ?? ''} onChange={handleEvaluationTypeSelect}>
//                 <option className={styles['subject-options']}  value='' disabled hidden>
//                    Evaluation Type
//                 </option>
//                 <option className={styles['subject-options']} value={1}>
//                     Perfect match
//                 </option>
//                 <option className={styles['subject-options']} value={2}>
//                     1 wrong answer cancel 1 correct answer
//                 </option>
//                 <option className={styles['subject-options']} value={3}>
//                     2 wrong answers cancel 1 correct answer
//                 </option>
//             </select>
//         </div>
//     );
// };

const SelectEvaluationType: React.FC<{ onSelectEvaluationType: (evaluationType: string) => void }> = ({ onSelectEvaluationType }) => {
    const [selectedEvaluationType, setSelectedEvaluationType] = useState<string | null>(null);

    const handleEvaluationTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const evaluationType = event.target.value;
        setSelectedEvaluationType(evaluationType);
        onSelectEvaluationType(evaluationType);
    };

    return (
        <div className={styles.evaluationContainer}>
            <select value={selectedEvaluationType ?? ''} onChange={handleEvaluationTypeSelect}>
                <option className={styles.evaluationOption} value="" disabled hidden>
                    Evaluation Types
                </option>
                <option className={styles.evaluationOption} value="Option 1">
                    Perfect match
                </option>
                <option className={styles.evaluationOption} value="Option 2">
                    One wrong answer cancels one correct answer
                </option>
                <option className={styles.evaluationOption} value="Option 3">
                    Two wrong answers cancel one correct answer
                </option>
            </select>
        </div>
    );
}

const AddQuestion: React.FC<{}> = () => {
    const [idC, setIdC] = useState<number | null>(() => {
        const savedCourseId = localStorage.getItem('selectedCourseId');
        return savedCourseId ? parseInt(savedCourseId) : null;
    });

    const [time, setTime] = useState<number>(0);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState<string>('');

    const handleCourseSelect = (courseId: number) => {
        setIdC(courseId);
        localStorage.setItem('selectedCourseId', String(courseId));
    };
    const handleEvaluationTypeSelect = (evaluationType: string) => {
        // Handle the selected evaluation type as needed
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredTime = parseFloat(event.target.value);
        if (enteredTime >= 0) {
            setTime(enteredTime);
        } else {
            setTime(0);
        }
    };

    const handleExamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamName(event.target.value);
    };

    const handleExamDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamDate(event.target.value);
    };


    return (
        <>
            <Nav />
            <div className={styles['body']}>

                <div className={styles['textBoxx'] }>
                    <div className={styles['body--subtitle--container']}>
                        <div className={styles['selects']}>
                            <SelectCourse onSelectCourse={handleCourseSelect} />
                        </div>

                        <div className={styles['box--button']}>
                            <Link to='/CreateAnExam'> <ButtonSaveExit />  </Link>

                        </div>

                        
                    </div>

                    
                </div>

                <div className={styles['body--details'] }>
                    <div className={styles['body--subtitle--container2']}>

                            <SelectEvaluationType onSelectEvaluationType={handleEvaluationTypeSelect} />
                    </div>


                    <input
                        type="text"
                        value={examName}
                        onChange={handleExamNameChange}
                        placeholder="Enter exam title"
                        className={styles['exam-name-input']}
                    />

                    <input
                        type="number"
                        step="any"
                        value={time !== 0 ? time : ''}
                        onChange={handleTimeChange}
                        placeholder="Enter time for exam"
                        className={styles['time-input']}
                    />

                    <input
                        type="datetime-local"
                        value={examDate}
                        onChange={handleExamDateChange}
                        className={styles['date-input']}
                    />
                </div>
               <Quizz_question/>

            </div>
            
        </>
    );
}

export default AddQuestion;