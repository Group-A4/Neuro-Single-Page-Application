import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

const ButtonViewExam: React.FC<{}> = () => {

    return(

        <Link to="/ViewExam">
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