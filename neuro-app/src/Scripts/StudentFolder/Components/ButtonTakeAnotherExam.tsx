import React from 'react'
import styles from '../ResultMockExamPage/MockExamResultPage.module.css';
import { Link } from "react-router-dom";

const Button:React.FC<{}> = () => {
    return (
      <div className={styles["but"]}>
        <Link to="/TakeAMockExam">
          <button> Take another exam </button>
        </Link>
      </div>
    );
}
export default Button;