import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

interface ButtonViewExamProps {
    examId: number;
    idCourse: number;
}

const ButtonViewExam: React.FC<ButtonViewExamProps> = ({ examId, idCourse }) => {

    return(

        <Link to={`/ViewExam?id=${examId}&courseId=${idCourse}`}>
        <button type="submit" className={styles['button--create']} >
            <div> 
                View student
            </div>
            <div> 
                exam
            </div>
        </button> 
        </Link>
    )


}

export default ButtonViewExam