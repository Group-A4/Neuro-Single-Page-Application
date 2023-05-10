import React from 'react';
import styles from './Button.module.css';


const ButtonAddQuestion: React.FC<{}> = () => {

    return(


        <button type="submit" className={styles['button--create']} >
            + ADD QUESTION
        </button> 
    )


}

export default ButtonAddQuestion