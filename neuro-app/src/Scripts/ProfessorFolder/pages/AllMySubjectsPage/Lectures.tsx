import React, { useEffect, useState } from 'react';
import styles from './Body.module.css';
import { Link } from 'react-router-dom';
import photo_option from './option.png';
import Scroll from '../../components/ScrollComp/Scroll';
import ButtonAddCourse from '../../components/buttonAddCourse/ButtonAddCourse';
import Nav from '../../components/nav/Nav';

interface Lecture {
    id: number;
    title: string;
    description: string;
    idCourse: number;
}

interface LectureProps {
    idCourse: number | null;
}

const Lectures: React.FC<LectureProps> = ({ idCourse }) => {
    const [lectures, setLectures] = useState<Lecture[]>([]);

    useEffect(() => {
        const fetchLectures = async () => {
            if (idCourse !== null) {
                const response = await fetch(`http://localhost:8192/lectures/course_id=${idCourse}`);
                const data = await response.json();
                setLectures(data);
                console.log(data);
            }
        };

        fetchLectures();
    }, [idCourse]);

    const deleteLecture = async (lectureId: number) => {
        try {
            const response = await fetch(`http://localhost:8192/lectures/${lectureId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Actualizează lista de lectii
                setLectures((prevLectures) => prevLectures.filter((lecture) => lecture.id !== lectureId));
            } else {
                console.log('Ștergerea lectiei a eșuat.');
            }
        } catch (error) {
            console.log('Eroare la ștergerea lectiei:', error);
        }
    };

    const renameLecture = async (lectureId: number, newTitle: string) => {
        const description = 'no description'; // Descrierea implicită
        if (newTitle) {
            try {
                const response = await fetch(`http://localhost:8192/lectures/${lectureId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: newTitle, description, idCourse }),
                });
                if (response.ok) {
                    // Actualizează lista de lectii
                    setLectures((prevLectures) =>
                        prevLectures.map((lecture) => {
                            if (lecture.id === lectureId) {
                                return { ...lecture, title: newTitle };
                            }
                            return lecture;
                        })
                    );
                } else {
                    console.log('Redenumirea lectiei a eșuat.');
                }
            } catch (error) {
                console.log('Eroare la redenumirea lectiei:', error);
            }
        }
    };

    return (
        <div className={styles['body--container']}>
            {idCourse !== null ? (
                <div>
                    {lectures.map((lecture) => (
                        <div className={styles['course-container']}>
                            <div key={lecture.title} className={styles['lecture']}>
                                <div className={styles['lecture-title']}>
                                    {lecture.title}
                                </div>
                            </div>
                            <div className={styles['body--img']}>
                                <Scroll
                                    onDeleteLecture={() => deleteLecture(lecture.id)}
                                    onRenameLecture={(newTitle: string) => renameLecture(lecture.id, newTitle)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles['no-course-selected']}>No course selected.</div>
            )}
        </div>
    );
}

export default Lectures;