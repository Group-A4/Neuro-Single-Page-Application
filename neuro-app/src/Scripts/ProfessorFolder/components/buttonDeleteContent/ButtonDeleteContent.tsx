import React from "react";
import styles from './Button.module.css';

const ButtonDeleteContent: React.FC<{}> = () => {
    return (

        <button type="button" className={styles['button--create']}>
            DELETE
        </button>
    )
}

export default ButtonDeleteContent