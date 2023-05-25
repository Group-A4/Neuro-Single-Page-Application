import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

interface ButtonViewExamProps {
  examId: number;
  studentId: number;
}

const ButtonStudentExam: React.FC<ButtonViewExamProps> = ({ examId, studentId }) => {
  return (
    <Link to={`/Exam?id=${examId}&studentId=${studentId}`}>
      <button type="submit" className={styles['button--create']}>
        <div>View the exam</div>
      </button>
    </Link>
  );
};

export default ButtonStudentExam;
