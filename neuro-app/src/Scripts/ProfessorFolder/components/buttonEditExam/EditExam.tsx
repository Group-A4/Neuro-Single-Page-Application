import React from 'react';
import styles from './Button.module.css';

interface ButtonSaveExitProps {
    type: "button" | "submit" | "reset";
    onClick?: () => void;
}

const EditExam: React.FC<ButtonSaveExitProps> = ({ type, onClick }) => {
    return (
        <button type={type} className={styles['button--create']} onClick={onClick}>
            Save exam
        </button>
    );
};

export default EditExam;