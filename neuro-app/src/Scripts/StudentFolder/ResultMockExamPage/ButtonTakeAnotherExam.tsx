import React from 'react'
import styles from './Body.module.css';
import { Link } from "react-router-dom";

const Button:React.FC<{}> = () => {
    return(
        <div className={styles['but']}> 
        {/* <Link to='/de adaugat link spre prima pagina cu TakeAMockExam (cand ale materia la care dau quizz ul) '>*/}
            <button>  Take another exam </button> 
        {/* </Link>  */}
        </div>
    )
}
export default Button;