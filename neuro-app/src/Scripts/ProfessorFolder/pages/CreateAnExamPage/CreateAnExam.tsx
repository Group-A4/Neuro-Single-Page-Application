import React from 'react'
import Nav from '../../components/nav/Nav';
import ButtonCreate from '../../components/buttonCreateAnExam/ButtonCreateExam';
import SelectSubject from '../../components/SelectSubjectComp/SelectSubject';
import fakeData from "./mock_data.json"
import image_dots from "./dots.png"

import styles from './Body.module.css'  


import { Column, useTable } from 'react-table';
import ScrollBlack from '../../components/ScrollCompBlack/ScrollBlack';

interface UserData {

    subject_title:string;
    duration:number;
    questions:number;
    points:number;
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
                                    <div className={styles['body--img']}>
                                        <ScrollBlack />
                                    </div>
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
                    Exams
                </div> 
                <div className={styles['body--button']}>
                    <ButtonCreate />
                </div>
            </div>   

            <div className={styles['body--subtitle--container']}>

                <SelectSubject />
                
            </div>
        
            <div className={styles['body--line']}></div>


            <Table/>

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

export default CreateAnExam;