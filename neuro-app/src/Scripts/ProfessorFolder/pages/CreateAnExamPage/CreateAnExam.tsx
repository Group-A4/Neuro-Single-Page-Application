import React, { useEffect, useState, } from 'react'
import Nav from '../../components/nav/Nav';
import ButtonCreate from '../../components/buttonCreateAnExam/ButtonCreateExam';
import WithAuth from '../../../../WithAuth';

import styles from './Body.module.css'


import { Column, CellProps, useTable } from 'react-table';
import ScrollBlack from '../../components/ScrollCompBlack/ScrollBlack';

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
    examPoints:number;
}

interface EvaluationTypeCellProps {
    value: number;
}

function getEvaluationTypeText(evaluationType: number): string {
    switch (evaluationType) {
        case 0:
            return 'Perfect match';
        case 1:
            return 'One wrong answer cancels one correct answer';
        case 2:
            return 'Two wrong answers cancel one correct answer';
        // Add more cases as needed for other evaluation types
        default:
            return 'Perfect match';
    }
}

const EvaluationTypeCell: React.FC<EvaluationTypeCellProps> = ({ value }) => {
    // Define your logic to convert the value to the corresponding text
    const evaluationTypeText = getEvaluationTypeText(value);

    return <span>{evaluationTypeText}</span>;
};


function Table({ examData }: { examData: ExamData[] }) {
    const token = localStorage.getItem('token');
    const [isExamStarted, setIsExamStarted] = useState<{ [key: number]: boolean }>(() => {
        const storedState = localStorage.getItem('examButtonState');
        return storedState ? JSON.parse(storedState) : {};
    });
    useEffect(() => {
        localStorage.setItem('examButtonState', JSON.stringify(isExamStarted));
    }, [isExamStarted]);

    const handleStartExam = (idExam: number) => {
        const endpoint = `http://localhost:8192/exam/activate/idExam=${idExam}`;

        fetch(endpoint, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                if (response.ok) {
                    console.log('Exam activation successful');
                    setIsExamStarted(prevState => ({
                        ...prevState,
                        [idExam]: true
                    }));
                } else {
                    throw new Error('Exam activation failed');
                }
            })
            .catch(error => {
                console.error('Failed to activate exam:', error);
            });
    };

    const handleStopExam = (idExam: number) => {
        const endpoint = `http://localhost:8192/exam/deactivate/idExam=${idExam}`;

        fetch(endpoint, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                if (response.ok) {
                    console.log('Exam deactivation successful');
                    setIsExamStarted(prevState => ({
                        ...prevState,
                        [idExam]: false
                    }));
                } else {
                    throw new Error('Exam deactivation failed');
                }
            })
            .catch(error => {
                console.error('Failed to deactivate exam:', error);
            });
    };


    const columns: Column<ExamData>[] = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Code',
                accessor: 'code',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Evaluation Type',
                accessor: 'evaluationType',
                Cell: ({ value }: CellProps<ExamData, number>) => (
                    <EvaluationTypeCell value={value} />),
            },
            {
                Header: 'Time Exam',
                accessor: 'timeExam',
            },
            {
                Header: 'Points',
                accessor: 'examPoints',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: examData });

    return (
        <div className={styles['table']}>
            <div className="container">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}

                                <th >

                                </th>
                                <th >

                                </th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                    <td className={styles['last--td']}>
                                        <button
                                            className={`${isExamStarted[row.original.id] ? styles['button-stop'] : styles['button-start']}`}
                                            onClick={() => isExamStarted[row.original.id] ? handleStopExam(row.original.id) : handleStartExam(row.original.id)}
                                        >
                                            {isExamStarted[row.original.id] ? 'STOP' : 'START'}
                                        </button>
                                    </td>
                                    <td className={styles['body--img']}>
                                        <ScrollBlack idExam={row.original.id} codeExam={row.original.code} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
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
                { headers: { 'Authorization': `Bearer ${token}` } } );
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

    useEffect(() => {
        const fetchExamData = async () => {
            if (selectedCourseId) {
                const response = await fetch(`http://localhost:8192/exam/summarise/idCourse=${selectedCourseId}`, 
                { headers: { 'Authorization': `Bearer ${token}` } });
                const data = await response.json();

                const professorId = user.id;

                const filteredData = data.filter((exam: ExamData) => exam.idProfessor === professorId);
                setExamData(filteredData);
            }
        };
        fetchExamData();
    }, [selectedCourseId]);

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
                    {Array.isArray(courses) && courses.map((course) => (
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
            <Table examData={examData} />
        </>
    );
};


const Body: React.FC<{}> = () => {
    const [idC, setIdC] = useState<number | null>(() => {
        const savedCourseId = localStorage.getItem('selectedCourseId');
        return savedCourseId ? parseInt(savedCourseId) : null;
    });

    const handleCourseSelect = (courseId: number) => {
        setIdC(courseId);
        localStorage.setItem('selectedCourseId', String(courseId));
    };


    return (

        <>

            <div className={styles['body--text']}>
                <div className={styles['body--title']}>
                    Exams
                </div>
                <div className={styles['body--button']}>
                    <ButtonCreate />
                </div>
            </div>

            <div className={styles['body--subtitle--container']}>
                <div className={styles['selects']}>
                    <SelectCourse onSelectCourse={handleCourseSelect} />
                </div>
            </div>

            {/* <div className={styles['body--line']}></div> */}



        </>


    )
}

const CreateAnExam: React.FC<{}> = () => {
    return (
        <body className={styles['body']}>
            <Nav />
            <Body />
        </body>
    );
}

export default WithAuth(CreateAnExam, [1]);