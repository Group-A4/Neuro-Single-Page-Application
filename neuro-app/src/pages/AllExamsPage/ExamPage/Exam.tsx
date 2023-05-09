import React from 'react'
import styles from './Body.module.css';
import Questions from './Questions';
import { Link } from 'react-router-dom';

import fakeData from "./mock_data.json"
import { Column, useTable } from 'react-table';
import ButtonSaveExit from '../../../components/buttonSaveAndExit/ButtonAddQuestion';
import Nav from '../../../Scripts/ProfessorFolder/components/nav/Nav';









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

            <div className={styles['body--content']}>
                <div className={styles['body--title']}>
                            Exam:   Subject title 1
                        </div>
                <Link to='/ViewExam'> <ButtonSaveExit />   </Link>
                </div>
              

                <Table/>
            
                <div className={styles['container']}>
                    <Questions/>
                </div>

        </>
    )
}


const Exam: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <Body />
              
            </body>


        </>
    );
}

export default Exam;