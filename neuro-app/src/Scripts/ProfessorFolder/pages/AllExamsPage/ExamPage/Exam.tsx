import React, { useState, useEffect } from 'react';
import styles from './Body.module.css';
import Questions from './Questions';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Column, useTable } from 'react-table';
import ButtonSaveExit from '../../../components/buttonSaveAndExit/ButtonAddQuestion';
import Nav from '../../../components/nav/Nav';
import withAuth from '../../../../../WithAuth';

interface UserData {
  idExam: string;
  subject_title: string;
  studentPoints: string;
  code: string;
  idStudent: string;
  studentCode: string;
  examPoints: string;
}


const Table: React.FC<{ data: UserData[]; studentCode: string }> = ({ data, studentCode }) => {
  data = data.map((item: UserData) => {
    return { ...item, studentCode: studentCode };
  });
  const columns: Column<UserData>[] = React.useMemo(
    () => [
      {
        Header: 'NR. MATRICOL',
        accessor: 'studentCode',
      },
      {
        Header: 'Score',
        accessor: (row) => `${row.studentPoints} / ${row.examPoints}`,
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
  } = useTable({ columns, data});

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
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Body: React.FC<{ userData: UserData[]; studentCode: string; studentId: string; examId: string}> = ({ userData, studentCode, studentId, examId }) => {
  const [examTitle, setExamTitle] = useState<string>('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchExamTitle = async () => {
      try {
        const response = await fetch(
          `http://localhost:8192/exam/viewExamResult/idExam=${examId}/idStudent=${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setExamTitle(data.title);
      } catch (error) {
        console.error('Error fetching exam title:', error);
      }
    };

    fetchExamTitle();
  }, [examId, studentId]);

  return (
    <>
      <div className={styles['body--content']}>
        <div className={styles['body--title']}>Exam: {examTitle}</div>
        <Link to={`/ViewExam?id=${examId}`}>
          <ButtonSaveExit />
        </Link>
      </div>

      <Table data={userData} studentCode={studentCode} />

      <div className={styles['container']}>
        <Questions examId={examId} studentId={studentId} />
      </div>
    </>
  );
};

const Exam: React.FC<{}> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get('id') as string;
  const studentId = queryParams.get('studentId') as string;
  const [userData, setUserData] = useState<UserData[]>([]);
  const [studentCode, setStudentCode] = useState<string>('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudentCode = async () => {
      try {
        const response = await fetch(
          `http://localhost:8192/exam/students/idExam=${examId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();

        const stringstudentId1 = String(studentId);
        const student = data.find((item: UserData) => {
          const stringstudentId2 = String(item.idStudent);
          return stringstudentId1 === stringstudentId2;
        });
        if (student) {
          setStudentCode(student.code);
        }
      } catch (error) {
        console.error('Error fetching student code:', error);
      }
    };

    const fetchStudentPoints = async () => {
      try {
        const response = await fetch(
          `http://localhost:8192/exam/viewExamResult/idExam=${examId}/idStudent=${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
    
        setUserData([data]); // Wrap the data in an array
    
      } catch (error) {
        console.error('Error fetching student points:', error);
      }
    };

    fetchStudentCode();
    fetchStudentPoints();
  }, [studentId, examId]);

  return (
    <>
      <body className={styles['body']}>
        <Nav />
        <Body userData={userData} studentCode={studentCode} studentId={studentId} examId={examId}/>
      </body>
    </>
  );
};

export default withAuth(Exam, [1]);
