import React from 'react';
import styles from './Button.module.css';


const ButtonSaveExit: React.FC<{}> = () => {

    return (
        <button type="submit" className={styles['sub']}>Save and Exit</button>
    )
}

export default ButtonSaveExit