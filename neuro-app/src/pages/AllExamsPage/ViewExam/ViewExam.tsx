import React from 'react'
import styles from './viewExam.module.css'
import ButtonStudentExam from '../../../components/buttonStudentExam/ButtonStudentExam';

import Nav from '../../../components/nav/Nav';


import fakeData from "./mock_data.json"
import { Column, useTable } from 'react-table';


interface UserData {

    subject_title: string;
    score: string;

}


function Table() {
    const data: UserData[] = React.useMemo(() => fakeData, []);

    const columns: Column<UserData>[] = React.useMemo(
        () => [
            {
                Header: 'NR. MATRICOL',
                accessor: 'subject_title',
            },
            {
                Header: 'Score',
                accessor: 'score',
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
                                        <ButtonStudentExam />
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
                    Student exams
                </div>

            </div>


            <Table />


        </>


    )
}

const ViewExam: React.FC<{}> = () => {
    return (
        <body className={styles['body']}>
            <Nav />
            <Body />
        </body>
    );
}

export default ViewExam;