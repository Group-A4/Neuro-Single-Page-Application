import React, { useEffect, useState, useRef } from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css';
import {useNavigate } from "react-router-dom";
import AddExam from '../../components/buttonAddExam/AddExam';
import Header from './header'
import WithAuth from '../../../../WithAuth';

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
    id: number;
    idProfessor: number;
    questionText: string;
    points: number;
    answersQuestion: MultipleChoiceAnswers[];
}


interface MultipleChoiceAnswers{
    id: number;
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
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('utilizator') || '{}');

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`http://localhost:8192/courses/professor=${user.id}`, 
            { headers: { 'Authorization': `Bearer ${token}` } });
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
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('utilizator') || '{}');
    const navigate = useNavigate();

    const [idC, setIdC] = useState<number | null>(() => {
        const savedCourseId = localStorage.getItem('selectedCourseId');
        return savedCourseId ? parseInt(savedCourseId) : null;
    });

    const [time, setTime] = useState<number>(0);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState<string>('');
    const [evaluationType, setEvaluationType] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState('');

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
            idProfessor: user.id,
            title: examName,
            timeExam: time,
            date: new Date(examDate),
            evaluationType: evaluationType === 'Option 1' ? 1 : evaluationType === 'Option 2' ? 2 : 0,
            // questionsMultipleChoiceExam: examQuestionsMultipleChoice,
            questionsMultipleChoice: questionsMultipleChoice,
            questionsLongResponse: questionsLongResponse,
        };
        try {

            const response = await fetch('http://localhost:8192/exam/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(examData),
            });
            if (response.ok) {
                // Examenul a fost creat cu succes
                console.log('Examen creat!');
            

                navigate("/CreateAnExam");
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

        let isFormValid = true;

        if (!examName) {
            setIsExamTitleValid(false);
            isFormValid = false;
        } else {
            setIsExamTitleValid(true);
        }

        if (time <= 0) {
            setIsTimeValid(false);
            isFormValid = false;
        } else {
            setIsTimeValid(true);
        }

        if (!examDate) {
            setIsExamDateValid(false);
            isFormValid = false;
        } else {
            setIsExamDateValid(true);
        }

        if (!isQuestionTextChangeValid) {
            setQuestionTextLongValid(false);
            isFormValid = false;
        } else {
            setQuestionTextLongValid(true);
        }
        if (!isAnswerTextValid) {
            setAnswerTextValid(false);
            isFormValid = false;
        } else {
            setAnswerTextValid(true);
        }

        if (!isQuestionTextLongValid) {
            setQuestionTextLongValid(false);
            isFormValid = false;
        } else {
            setQuestionTextLongValid(true);
        }

        const hasEmptyQuestionMultipleChoice = questionsMultipleChoice.some(
            (question) => question.questionText.length === 0 || question.answersQuestion.some((answer) => answer.answerText.length === 0)
        );
        if (hasEmptyQuestionMultipleChoice) {
            isFormValid = false;
            alert('Please enter data for all questions');
            return;
        }

        const hasQuestionsWithoutAnswers = questionsMultipleChoice.some(
            (question) => question.answersQuestion.length === 0
        );

        if (hasQuestionsWithoutAnswers) {
            setIsFormValid(false);
            alert('There are questions without answer choices');
            return;
        }

        const hasEmptyQuestionLong = questionsLongResponse.some(
            (question) => question.questionText.length === 0 || question.expectedResponse.length === 0
        );
        if (hasEmptyQuestionLong) {
            isFormValid = false;
            alert('Please enter data for all questions');
            return;
        }

        setIsFormValid(isFormValid);

        if (isFormValid) {
            createExam()
                .catch((error) => {
                    console.error('Failed to create exam:', error);
                    setErrorMessage('Failed to create exam. Please try again.');
                });
        } else {
            alert('Unable to create the exam. Please check the error messages and try again.');
        }
    };

    ////////////////////////////////////////////////////////////
    const [questionsMultipleChoice, setQuestionsMultipleChoice] = useState<MultipleChoice[]>([]);
    const [questionsLongResponse, setQuestionsLongResponse] = useState<LongResponse[]>([]); 
    const lastQuestionRef = useRef<HTMLDivElement>(null);
    const lastLongResponseRef = useRef<HTMLDivElement>(null);



    const addQuestionLong = () => {
        const newQuestion: LongResponse = {
            idProfessor: user.id,
            questionText: '',
            points: 0,
            expectedResponse: '',
        };
        setQuestionsLongResponse((prevQuestions) => [...prevQuestions, newQuestion]);
        if (lastLongResponseRef.current) {
            lastLongResponseRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const addMultipleChoice = () => {
        const newQuestion: MultipleChoice = {
            id: 0,
            idProfessor: user.id,
            questionText: '',
            points: 0,
            answersQuestion: [],
        };
        setQuestionsMultipleChoice((prevQuestions) => [...prevQuestions, newQuestion]);
        if (lastQuestionRef.current) {
            lastQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    };


    const addAnswer = (questionIndex: number) => {
        const newQuestions = [...questionsMultipleChoice];
        const newAnswer: MultipleChoiceAnswers = {
            id: newQuestions[questionIndex].answersQuestion.length, // Generate unique id for answer
            answerText: "",
            correct: false,
        };
        newQuestions[questionIndex].answersQuestion.push(newAnswer);
        setQuestionsMultipleChoice(newQuestions);
    };


    const [isQuestionTextChangeValid, setQuestionTextChangeValid] = useState(true);
    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
        const { value } = event.target;
        setQuestionsMultipleChoice((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[questionIndex].questionText = event.target.value;
            if (newQuestions[questionIndex].questionText.length === 0)
                setQuestionTextChangeValid(false);
            else
                setQuestionTextChangeValid(true);
            return newQuestions;
        });

    };

    const [isQuestionTextLongValid, setQuestionTextLongValid] = useState(true);
    const handleQuestionTextChangeLong = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
        setQuestionsLongResponse((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[questionIndex].questionText = event.target.value;
            if (newQuestions[questionIndex].questionText.length === 0)
                setQuestionTextLongValid(false);
            else
                setQuestionTextLongValid(true);
            return newQuestions;
        });
    };

    const [isAnswerTextValid, setAnswerTextValid] = useState(true);
    const handleAnswerTextChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        questionIndex: number,
        answerIndex: number
    ) => {
        setQuestionsMultipleChoice((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[questionIndex].answersQuestion[answerIndex].answerText = event.target.value;
            if (newQuestions[questionIndex].answersQuestion[answerIndex].answerText.length === 0)
                setAnswerTextValid(false);
            else
                setAnswerTextValid(true);
            return newQuestions;
        });
    };


    const handleAnswerCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        questionIndex: number,
        answerIndex: number
    ) => {
        setQuestionsMultipleChoice((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[questionIndex].answersQuestion[answerIndex].correct = event.target.checked;
            return newQuestions;
        });
    };

    const handleExpectedResponseChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
        setQuestionsLongResponse((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[questionIndex].expectedResponse = event.target.value;
            return newQuestions;
        });
    };

    const removeMultipleChoiceQuestion = (questionIndex: number) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this question?");
        if (confirmDelete) {
            setQuestionsMultipleChoice((prevQuestions) => {
                const newQuestions = [...prevQuestions];
                newQuestions.splice(questionIndex, 1);
                return newQuestions;
            });
        }

    };

    const removeMultipleChoiceAnswer = (questionIndex: number, answerIndex: number) => {
        setQuestionsMultipleChoice((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[questionIndex] = {
                ...newQuestions[questionIndex],
                answersQuestion: newQuestions[questionIndex].answersQuestion.filter(
                    (_, index) => index !== answerIndex
                ),
            };
            return newQuestions;
        });
    };

    const removeQuestionLongResponse = (questionIndex: number) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this question?");
        if (confirmDelete) {
            setQuestionsLongResponse((prevQuestions) => {
                const newQuestions = [...prevQuestions];
                newQuestions.splice(questionIndex, 1);
                return newQuestions;
            });
        }
    };


    const setPointMultipleChoice = (questionIndex: number, value: number) => {
        const newQuestionsMultipleChoice = [...questionsMultipleChoice];
        newQuestionsMultipleChoice[questionIndex].points = value;
        setQuestionsMultipleChoice(newQuestionsMultipleChoice);

    };

    const setPointLongResponse = (questionIndex: number, value: number) => {
        const newQuestionsLongResponse = [...questionsLongResponse];
        newQuestionsLongResponse[questionIndex].points = value;
        setQuestionsLongResponse(newQuestionsLongResponse);
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


                    <div className={styles['body--second_text']}>
                        Add content to your exam.</div>
                    {questionsMultipleChoice.map((question, questionIndex) => (
                        <div key={questionIndex} ref={questionIndex === questionsMultipleChoice.length - 1 ? lastQuestionRef : null}>
                            <div className={styles['box']}>
                                <Header
                                    point={question.points.toString()}
                                    setPoint={(newPoints) => setPointMultipleChoice(questionIndex, Number(newPoints))}
                                />
                                {question.points === 0 && (
                                    <div className={styles['error-message-points']}>Attention, the number of points is 0!</div>
                                )}
                                {question.questionText.length === 0 && (
                                    <div className={styles['error-message-quest']}>Please enter a question.</div>
                                )}
                                <label>
                                    <input
                                        type="text"
                                        value={question.questionText}
                                        placeholder="Type question here"
                                        className={styles.quest}
                                        onChange={(event) => handleQuestionTextChange(event, questionIndex)}
                                    />
                                </label>

                                <button type="button" onClick={() => removeMultipleChoiceQuestion(questionIndex)} className={styles.removeq}>
                                    Remove
                                </button>
                                
                                <div>
                                    {question.answersQuestion.map((answer, answerIndex) => (
                                        <div key={answerIndex}>
                                            {answer.answerText.length === 0 && (
                                                <div className={styles['error-message-text-answer']}>Please enter an answer choice.</div>
                                            )}
                                            <label className={styles.lb}>
                                                <input
                                                    type="checkbox"
                                                    checked={answer.correct}
                                                    className={styles.check}
                                                    onChange={(event) => handleAnswerCheckboxChange(event, questionIndex, answerIndex)}
                                                />
                                                <input
                                                    type="text"
                                                    value={answer.answerText}
                                                    placeholder="Answer choice"
                                                    className={styles.answ}
                                                    onChange={(event) => handleAnswerTextChange(event, questionIndex, answerIndex)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeMultipleChoiceAnswer(questionIndex, answerIndex)}
                                                    className={styles.removea}>
                                                    Remove
                                                </button>
                                            </label>
                                        </div>
                                    ))}
                                    {question.answersQuestion.length === 0 && (
                                        <div className={styles['error-message-answer']}>Please add at least one answer.</div>
                                    )}
                                    <button type="button" onClick={() => addAnswer(questionIndex)} className={styles.addansw}>
                                        + Add answer
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}

                    {questionsLongResponse.map((question, questionIndex) => (
                        <div key={questionIndex} ref={questionIndex === questionsLongResponse.length - 1 ? lastLongResponseRef : null}>
                            <div className={styles['box']}>

                                <Header
                                    point={question.points.toString()}
                                    setPoint={(newPoints) => setPointLongResponse(questionIndex, Number(newPoints))}
                                />
                                {question.points === 0 && (
                                    <div className={styles['error-message-points']}>Attention, the number of points is 0!</div>
                                )}
                                {question.questionText.length === 0 && (
                                    <div className={styles['error-message-quest']}>Please enter a question.</div>
                                )}
                                <input
                                    type="text"
                                    value={question.questionText}
                                    placeholder="Type question here"
                                    className={styles.quest}
                                    onChange={(event) => handleQuestionTextChangeLong(event, questionIndex)}
                                />
                                {question.expectedResponse.length === 0 && (
                                    <div className={styles['error-message-answer']}> Please add the expected answer.</div>
                                )}
                                <input
                                    type="text"
                                    value={question.expectedResponse}
                                    placeholder="Expected response"
                                    className={styles.resplong}
                                    onChange={(event) => handleExpectedResponseChange(event, questionIndex)}
                                />
                                <button type="button" onClick={() => removeQuestionLongResponse(questionIndex)} className={styles.removeq2}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="button" className={styles.addquest} onClick={addMultipleChoice}>+ Add Multiple Choice</button>
                    <button type="button" className={styles.addquestL} onClick={addQuestionLong}>+ Add Short Answer</button>

                </form>

            </div>
            
        </>
    );
}

export default WithAuth(AddQuestion, [1]);