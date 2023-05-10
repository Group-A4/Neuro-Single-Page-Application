import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';


const ButtonCreate: React.FC<{}> = () => {

    return(


      
        <Link to='/CreateExamQuestions'>
            <button type="submit" className={styles['button--create']} >
                + CREATE AN EXAM
            </button>
        </Link>  
    )


}

export default ButtonCreate
