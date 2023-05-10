import React, { useEffect, useState } from 'react';
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
import { useLocation } from 'react-router-dom';

const ViewLessonMaterials: React.FC<{ id_course: string }> = ({ id_course }) => {
  const [materials, setMaterials] = useState<any[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const course = searchParams.get('id_course');

  useEffect(() => {
    fetchMaterials(id_course);
  }, [id_course]);

  const fetchMaterials = async (id_course: string) => {
    try {
      const response = await fetch(`http://localhost:8191/materials/id_course=${course}`);
      const materials = await response.json();
      setMaterials(materials);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <body className={styles['body']}>
        <div className={styles['body--text']}>View lecture materials</div>

        <div className={styles['body--content']}>
          <ul>
            {materials.map((material) => (
              <li key={material.id}>
                <a href={material.html} target="_blank" rel="noopener noreferrer">
                  {material.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </>
  );
};

export default ViewLessonMaterials;