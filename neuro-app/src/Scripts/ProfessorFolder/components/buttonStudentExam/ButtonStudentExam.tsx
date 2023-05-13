import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

const ButtonStudentExam: React.FC<{}> = () => {

    return(

        <Link to="/Exam">
        <button type="submit" className={styles['button--create']} >
            <div> 
                View the exam
            </div>
            
        </button> 
        </Link>
    )


}

export default ButtonStudentExam