import React, { useEffect, useState, } from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css';
import Quizz_question from './quizz_question';
import { Link, useNavigate } from "react-router-dom";
import AddExam from '../../components/buttonAddExam/AddExam';

interface Exam {
    idCourse: number;
    idProfessor: number;
    title: string;
    timeExam: number;
    date: Date;
    evaluationType: number;
    questionsMultipleChoice: MultipleChoice[];
    questionsLongResponse: LongResponse[];
}

interface MultipleChoice{
    idProfessor: number;
    questionText: string;
    points: number;
    answersQuestion: MultipleChoiceAnswers[];

}

interface MultipleChoiceAnswers{
    answerText:string;
    correct:boolean;
}

interface LongResponse {
    idProfessor: number;
    questionText: string;
    points: number;
    expectedResponse: string;
}

interface Course {
    id: number,
    title: string,
    year: number
    semester: number,
    credits: number
}

interface ExamData {

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
    const [examData, setExamData] = useState<ExamData[]>([]);

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
                <option className={styles.evaluationOption} value="Perfect match">
                    Perfect match
                </option>
                <option className={styles.evaluationOption} value="Option 1">
                    One wrong answer cancels one correct answer
                </option>
                <option className={styles.evaluationOption} value="Option 2">
                    Two wrong answers cancel one correct answer
                </option>
            </select>
        </div>
    );
}

const AddQuestion: React.FC<{}> = () => {
    const navigate = useNavigate();

    const [idC, setIdC] = useState<number | null>(() => {
        const savedCourseId = localStorage.getItem('selectedCourseId');
        return savedCourseId ? parseInt(savedCourseId) : null;
    });

    const [time, setTime] = useState<number>(0);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState<string>('');
    const [evaluationType, setEvaluationType] = useState<string>('');

    const [exam, setExam] = useState<Exam>({
        idCourse: 0,
        idProfessor: 0,
        title: "",
        timeExam: 0,
        date: new Date(),
        evaluationType: 0,
        questionsMultipleChoice: [],
        questionsLongResponse: [],
    });

    const createExam = async () => {
        const examData: Exam = {
            idCourse: idC!,
            idProfessor: 52,
            title: examName,
            timeExam: time,
            date: new Date(examDate),
            evaluationType: evaluationType === 'Option 1' ? 1 : evaluationType === 'Option 2' ? 2 : 0,
            questionsMultipleChoice: [],
            questionsLongResponse: [],
        };
        try {
            const response = await fetch('http://localhost:8192/exam/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examData),
            });

            if (response.ok) {
                // Examenul a fost creat cu succes
                console.log('Examen creat!');
                navigate("/CreateAnExam");
            } else {
                // A apărut o eroare la crearea examenului
                console.error('Eroare la crearea examenului!');
            }
        } catch (error) {
            console.error('Eroare la crearea examenului:', error);
        }
    };

    const handleCourseSelect = (courseId: number) => {
        setIdC(courseId);
        localStorage.setItem('selectedCourseId', String(courseId));
    };
    const handleEvaluationTypeSelect = (evaluationType: string) => {
        setEvaluationType(evaluationType);
    };

    const [isExamTitleValid, setIsExamTitleValid] = useState(true);
    const [isTimeValid, setIsTimeValid] = useState(true);
    const [isExamDateValid, setIsExamDateValid] = useState(true);
    const [isFormValid, setIsFormValid] = useState(true);

    const handleExamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamName(event.target.value);
        setIsExamTitleValid(true);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredTime = parseFloat(event.target.value);
        if (enteredTime >= 0) {
            setTime(enteredTime);
            setIsTimeValid(true);
        } else {
            setIsTimeValid(false);
        }
    };

    const handleExamDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamDate(event.target.value);
        setIsExamDateValid(true);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!examName) {
            setIsExamTitleValid(false);
        }

        if (time <= 0) {
            setIsTimeValid(false);
        }

        if (!examDate) {
            setIsExamDateValid(false);
        }

        if (!examName || time <= 0 || !examDate) {
            setIsFormValid(false);
            return;
        }

        createExam();
    };


    return (
        <>
            <Nav />
            <div className={styles['body']}>
                <form onSubmit={handleSubmit}> {/* Adaugă formularul în jurul conținutului */}
                    <div className={styles['textBoxx'] }>
                        <div className={styles['body--subtitle--container']}>
                            <div className={styles['selects']}>
                                <SelectCourse onSelectCourse={handleCourseSelect} />
                            </div>


                            <div className={styles['box--button']} onSubmit={handleSubmit}>
                                {/* <Link to="/CreateAnExam"> */}
                                    <AddExam type="submit" />
                                {/* </Link> */}
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
                            className={`${styles['exam-name-input']} ${isExamTitleValid ? '' : styles['invalid-input']}`}
                        />
                        {!isExamTitleValid && <p className={styles['error-message']}>The exam title must be entered</p>}

                        <input
                            type="number"
                            step="any"
                            value={time !== 0 ? time : ''}
                            onChange={handleTimeChange}
                            placeholder="Enter time for exam"
                            className={`${styles['time-input']} ${isTimeValid ? '' : styles['invalid-input']}`}
                        />
                        {!isTimeValid && <p className={styles['error-message']}>The time for the exam must be a positive number</p>}

                        <input
                            type="datetime-local"
                            value={examDate}
                            onChange={handleExamDateChange}
                            className={`${styles['date-input']} ${isExamDateValid ? '' : styles['invalid-input']}`}
                        />
                        {!isExamDateValid && <p className={styles['error-message']}>The exam date must be selected</p>}
                    </div>
                </form>
               <Quizz_question/>
            </div>
            
        </>
    );
}

export default AddQuestion;