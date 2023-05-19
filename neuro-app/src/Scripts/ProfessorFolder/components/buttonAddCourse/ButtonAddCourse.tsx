import React from 'react';
import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';



interface ButtonAddCourseProps {
    idCourse: number | null;
}

const ButtonAddCourse: React.FC<ButtonAddCourseProps> = ({ idCourse }) => {
    const navigate = useNavigate();

    const handleAddCourse = async () => {
        if (idCourse !== null) {
            const lectureData = {
                title: 'New course',
                description: 'No description',
                idCourse: idCourse
            };

            const response = await fetch('http://localhost:8192/lectures/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lectureData),
            });

            if (response.ok) {
                // Lecture created successfully, navigate to the desired route
                window.location.reload();
            } else {
                // Handle error case
            }
        }
    };

    return (
        <button className={styles['button--create']} onClick={handleAddCourse}>
            Add Lecture
        </button>
    );
};

export default ButtonAddCourse;