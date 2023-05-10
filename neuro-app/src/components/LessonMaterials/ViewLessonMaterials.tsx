import React, { useEffect, useState } from 'react';
import styles from './Body.module.css';

type Props = {
  id_course: string;
};

const useGetMaterials = (id_course: string) => {
    const [materials, setMaterials] = useState<any[]>([]);

    useEffect(() => {
      fetchMaterials(id_course);
    }, [id_course]);
  
    const fetchMaterials = async (id_course: string) => {
      try {
        const response = await fetch(`http://localhost:8191/materials/id_course=${id_course}`);
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error(error);
      }
    };
    return materials;
}

const ViewLessonMaterials: React.FC<Props> = ({ id_course }) => {
  
    const materials = useGetMaterials(id_course);
    
  return (
    <>
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
