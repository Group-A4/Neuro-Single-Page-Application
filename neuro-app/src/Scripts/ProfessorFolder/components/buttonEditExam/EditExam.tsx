import React from 'react';
import styles from './Button.module.css';


const EditExam: React.FC<{}> = () => {
    return (
        <button type="submit" className={styles['button--create']} >
            Save and exit
        </button>
    );
};

export default EditExam;