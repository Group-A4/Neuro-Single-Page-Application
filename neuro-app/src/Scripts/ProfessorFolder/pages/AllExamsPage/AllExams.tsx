import React, { useEffect, useState, } from 'react'
import styles from './Body1.module.css'


import SelectSubject from '../../components/SelectSubjectComp/SelectSubject';

import fakeData from "./mock_data.json"
import { Column, useTable } from 'react-table';
import ButtonViewExam from '../../components/buttonViewExam/ButtonViewExam';
import Nav from '../../components/nav/Nav';

interface Course {
    id: number,
    title: string,
    year: number
    semester: number,
    credits: number
}

interface UserData {

    subject_title: string;
    idProfessor: number;
    duration: number;
    date: string;
    points: number;
    
}


function Table() {
    const data: UserData[] = React.useMemo(() => fakeData, []);

    const columns: Column<UserData>[] = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'subject_title',
            },
            {
                Header: 'Duration',
                accessor: 'duration',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Points',
                accessor: 'points',
            }

        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className={styles['table']}>
            <div className="container">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}

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
                                        <td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                                    ))}
                                    <td className={styles['last--td']}>
                                        <ButtonViewExam />
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

    useEffect(() => {
        const fetchExamData = async () => {
            if (selectedCourseId) {
                const response = await fetch(`http://localhost:8192/exam/summarise/idCourse=${selectedCourseId}`);
                const data = await response.json();

                const professorId = 52; // ID-ul profesorului curent

                const filteredData = data.filter((exam: UserData) => exam.idProfessor === professorId);
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
                    All exams
                </div>

            </div>

            <div className={styles['body--subtitle--container']}>
                <div className={styles['selects']}>
                    <SelectCourse onSelectCourse={handleCourseSelect} />
                </div>
            </div>

            <div className={styles['body--line']}></div>

            <Table />
        </>


    )
}

const AllExams: React.FC<{}> = () => {
    return (
        <body className={styles['body']}>
            <Nav />
            <Body />
        </body>
    );
}

export default AllExams;