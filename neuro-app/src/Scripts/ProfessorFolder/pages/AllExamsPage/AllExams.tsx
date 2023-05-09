import React from 'react'
import styles from './Body1.module.css'


import SelectSubject from '../../components/SelectSubjectComp/SelectSubject';

import fakeData from "./mock_data.json"
import { Column, useTable } from 'react-table';
import ButtonViewExam from '../../components/buttonViewExam/ButtonViewExam';
import Nav from '../../components/nav/Nav';


interface UserData {

    subject_title: string;
    duration: number;
    questions: number;
    points: number;
}


function Table() {
    const data: UserData[] = React.useMemo(() => fakeData, []);

    const columns: Column<UserData>[] = React.useMemo(
        () => [
            {
                Header: 'Subject title',
                accessor: 'subject_title',
            },
            {
                Header: 'Duration',
                accessor: 'duration',
            },
            {
                Header: 'Questions',
                accessor: 'questions',
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


const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--text']}>
                <div className={styles['body--title']}>
                    All exams
                </div>

            </div>

            <div className={styles['body--subtitle--container']}>
                <SelectSubject />
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