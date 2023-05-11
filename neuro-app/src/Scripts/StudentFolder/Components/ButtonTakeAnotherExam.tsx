import React from 'react'
import '../ResultMockExamPage/MockExamResultPage.css';
import { Link } from "react-router-dom";

const Button:React.FC<{}> = () => {
    return(
        <div className='but'> 
        <Link to='/TakeAMockExam'>
            <button>  Take another exam </button> 
        </Link> 
        </div>
    )
}
export default Button;