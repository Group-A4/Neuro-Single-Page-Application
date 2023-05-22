import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './viewExam.module.css';
import ButtonStudentExam from '../../../components/buttonStudentExam/ButtonStudentExam';
import Nav from '../../../components/nav/Nav';

interface ExamResult {
  code: string;
  totalPoints: number;
}

interface Student {
  id: number;
  code: string;
}

const Table: React.FC<{ examResults: ExamResult[] }> = ({ examResults }) => {
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
                <td>{result.totalPoints}</td>
                <td className={styles['last--td']}>
                  <ButtonStudentExam />
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
  const courseId = queryParams.get('courseId');
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [studentIds, setStudentIds] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudentIds = async () => {
      try {
        const response = await fetch(`http://localhost:8192/students/course=${courseId}`);
        if (!response.ok) {
          throw new Error('Response not OK');
        }
        const data = await response.json();
        const students: Student[] = data.map((student: Student) => student);
        setStudentIds(students);
      } catch (error) {
        console.error('Error fetching studentIds:', error);
      }
    };

    if (courseId) {
      fetchStudentIds();
    }
  }, [courseId]);

  useEffect(() => {
    const fetchExamResults = async () => {
      try {
        console.log(studentIds);
        const promises = studentIds.map(async (student) => {
          try {
            const response = await fetch(`http://localhost:8192/exam/viewExamResult/idExam=${examId}/idStudent=${student.id}`);
            if (!response.ok) {
              throw new Error('Response not OK');
            }
            const data = await response.json();
            const examResult: ExamResult = {
              code: student.code,
              totalPoints: data.totalPoints,
            };
            return examResult;
          } catch (error) {
            console.error(`Error fetching exam results for studentId ${student.id}:`, error);
            return null; // Return null for the failed fetch requests
          }
        });
        const results = await Promise.all(promises);
        const filteredResults = results.filter((result) => result !== null) as ExamResult[]; // Filter out the null results and cast the array to ExamResult[]
        setExamResults(filteredResults);
      } catch (error) {
        console.error('Error fetching exam results:', error);
      }
    };
  
    if (examId && studentIds.length > 0) {
      fetchExamResults();
    }
  }, [examId, studentIds]);
  

  return (
    <>
      <div className={styles['body--text']}>
        <div className={styles['body--title']}>Student exams</div>
      </div>
      <Table examResults={examResults} />
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

export default ViewExam;
