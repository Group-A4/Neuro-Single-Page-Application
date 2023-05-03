import React from 'react'
import styles from './Body.module.css';
import { Link } from "react-router-dom";

const Button:React.FC<{}> = () => {
    return(
        <div className={styles['but']}> 
        {/* <Link to='/ de adaugat link spre pagina in care pot vedea rezultatele la quiz'> */}
            <button>  View my answers </button> 
        {/* </Link>  */}
        </div>
    )
}
export default Button;