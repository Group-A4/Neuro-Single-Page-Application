import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './viewExam.module.css';
import ButtonStudentExam from '../../../components/buttonStudentExam/ButtonStudentExam';
import Nav from '../../../components/nav/Nav';
import withAuth from '../../../../../WithAuth';

interface ExamResult {
  code: string;
  pointsExam: number;
  pointsStudent: number;
  idStudent: number;
}

const Table: React.FC<{ examResults: ExamResult[]; examId: number }> = ({ examResults, examId }) => {
  return (
    <div className={styles['table']}>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>NR. MATRICOL</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((result, index) => (
              <tr key={index}>
                <td>{result.code}</td> {/* Display the student's NR. MATRICOL */}
                <td>{result.pointsStudent}/{result.pointsExam}</td>
                <td className={styles['last--td']}>
                  <ButtonStudentExam examId={examId} studentId={result.idStudent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Body: React.FC<{}> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get('id');
  const parsedExamId = examId ? parseInt(examId) : 0; // Convert examId to a number or set it to 0 if it's null

  const token = localStorage.getItem('token');

  const [examResults, setExamResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    const fetchExamResults = async () => {
      try {
        const response = await fetch(`http://localhost:8192/exam/students/idExam=${parsedExamId}`, 
          { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();
        setExamResults(data);
      } catch (error) {
        console.error('Error fetching exam results:', error);
      }
    };

    fetchExamResults();
  }, [parsedExamId]);

  return (
    <>
      <div className={styles['body--text']}>
        <div className={styles['body--title']}>Student exams</div>
      </div>
      <Table examResults={examResults} examId={parsedExamId} />
    </>
  );
};

const ViewExam: React.FC<{}> = () => {
  return (
    <body className={styles['body']}>
      <Nav />
      <Body />
    </body>
  );
};

export default withAuth(ViewExam, [1]);
