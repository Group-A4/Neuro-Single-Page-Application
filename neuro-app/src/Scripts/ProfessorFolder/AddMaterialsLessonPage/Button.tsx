import React from 'react'
import styles from './Body.module.css'
import { Link } from "react-router-dom";

const Button:React.FC<{}> = () => {
    return(
        <div className={styles['but']}> 
        <Link to='/AddQuestion'>
            <button>  Next step </button> 
        </Link> 
        </div>
    )
}
export default Button;