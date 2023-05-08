import React from 'react'
import styles from './Body.module.css'
import { Link } from 'react-router-dom';
// import { Link } from "react-router-dom";

const Buttons:React.FC<{}> = () => {
    return(
        <>
            <Link to='/ViewLessonMaterials'>
                <button type="submit" className={styles['body--button--publish']} >
                    Publish
                </button> 
            </Link>

            <button type="submit" className={styles['body--button--add']} >
                Add file
            </button> 
        </>
    )
}
export default Buttons;