import React from 'react';
import styles from './Button.module.css';


const ButtonSaveExit: React.FC<{}> = () => {

    return(


        <button type="submit" className={styles['button--create']}  >
            Save and Exit
        </button> 
    )


}

export default ButtonSaveExit