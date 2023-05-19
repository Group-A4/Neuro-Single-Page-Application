import React from 'react';
import styles from './Button.module.css';

interface ButtonSaveExitProps {
    type: "button" | "submit" | "reset";
    onClick?: () => void;
}

const AddExam: React.FC<ButtonSaveExitProps> = ({ type, onClick }) => {
    return (
        <button type={type} className={styles['button--create']} onClick={onClick}>
            Create exam
        </button>
    );
};

export default AddExam;