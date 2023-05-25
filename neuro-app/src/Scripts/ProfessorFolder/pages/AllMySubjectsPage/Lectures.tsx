import React, { useEffect, useState, useRef } from 'react';
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
    const [editingLectureId, setEditingLectureId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLectures = async () => {
            if (idCourse !== null) {
                const response = await fetch(`http://localhost:8192/lectures/course_id=${idCourse}`, {headers: { Authorization: `Bearer ${token}` }});
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
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                setLectures((prevLectures) => prevLectures.filter((lecture) => lecture.id !== lectureId));
            } else {
                console.log('Ștergerea lectiei a eșuat.');
            }
        } catch (error) {
            console.log('Eroare la ștergerea lectiei:', error);
        }
    };

    const renameLecture = async (lectureId: number, newTitle: string) => {
        const description = 'no description';
        if (newTitle) {
            try {
                const response = await fetch(`http://localhost:8192/lectures/${lectureId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title: newTitle, description, idCourse }),
                });
                if (response.ok) {
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

    const startEditingLecture = (lectureId: number, currentTitle: string) => {
        setEditingLectureId(lectureId);
        setEditedTitle(currentTitle);
        if (inputRef.current) {
            inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
        }
    };

    const cancelEditingLecture = () => {
        setEditingLectureId(null);
        setEditedTitle('');
    };

    const saveEditedLecture = async (lectureId: number) => {
        const description = 'no description';
        if (editedTitle.trim() !== '') {
            try {
                const response = await fetch(`http://localhost:8192/lectures/${lectureId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title: editedTitle, description, idCourse }),
                });
                if (response.ok) {
                    setLectures((prevLectures) =>
                        prevLectures.map((lecture) => {
                            if (lecture.id === lectureId) {
                                return { ...lecture, title: editedTitle };
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
        setEditingLectureId(null);
        setEditedTitle('');
        if (inputRef.current) {
            inputRef.current.style.width = 'fit-content';
        }
    };

    return (
        <div className={styles['body--container']}>
            {idCourse !== null ? (
                <div>
                    {lectures.map((lecture) => (
                        <div className={styles['course-container']} key={lecture.id}>
                            {editingLectureId === lecture.id ? (
                                <div className={styles['lecture']}>
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className={`${styles['lecture-title-edit']}`}
                                        ref={inputRef}
                                        style={{ width: inputRef.current?.scrollWidth }}
                                    />
                                    <div className={styles['lecture-buttons']}>
                                        <button
                                            onClick={() => saveEditedLecture(lecture.id)}
                                            className={`${styles['lecture-button-save']} ${styles['green-button']}`}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEditingLecture}
                                            className={`${styles['lecture-button-cancel']} ${styles['red-button']}`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles['lecture']}>
                                    <div className={styles['lecture-title']}>{lecture.title}</div>
                                    <div className={styles['lecture-buttons']}>
                                        <button
                                            onClick={() => startEditingLecture(lecture.id, lecture.title)}
                                                className={`${styles['lecture-button-edit']} ${styles['green-button']}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteLecture(lecture.id)}
                                                className={`${styles['lecture-button-delete']} ${styles['red-button']}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className={styles['body--img']}>
                                <Scroll
                                    onDeleteLecture={() => deleteLecture(lecture.id)}
                                    onRenameLecture={(newTitle: string) => renameLecture(lecture.id, newTitle)}
                                    lectureId={lecture.id}
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
};

export default Lectures;