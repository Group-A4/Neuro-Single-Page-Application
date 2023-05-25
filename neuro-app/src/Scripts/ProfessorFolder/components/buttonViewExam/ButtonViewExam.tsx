import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

interface ButtonViewExamProps {
    examId: number;
}

const ButtonViewExam: React.FC<ButtonViewExamProps> = ({ examId }) => {

    return(

        <Link to={`/ViewExam?id=${examId}`}>
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