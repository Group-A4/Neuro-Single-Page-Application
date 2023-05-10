import React from 'react';
import styles from './Button.module.css';


const ButtonAddCourse : React.FC<{}> = () => {


    // return (

    //     <Formular />
    // )
    return(


        <button type="submit" className={styles['button--create']} >
            + ADD NEW COURSE
        </button> 
    )


}

export default ButtonAddCourse;