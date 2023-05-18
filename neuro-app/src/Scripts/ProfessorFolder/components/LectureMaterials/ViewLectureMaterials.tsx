import React, { useEffect, useState } from 'react';
import styles from './LectureMaterials.module.css';
import Nav from '../nav/Nav';
import { SERVER_ADDRESS } from '../../../../config/config';

type Props = {
  id_lecture: string;
};

const useGetMaterials = (id_lecture: string) => {
    const [materials, setMaterials] = useState<any[]>([]);

    useEffect(() => {
      fetchMaterials(id_lecture);
    }, [id_lecture]);
  
    const fetchMaterials = async (id_lecture: string) => {
      try {
        const response = await fetch(SERVER_ADDRESS + `/materials/id_lecture=${id_lecture}`);
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error(error);
      }
    };
    return materials;
}

const ViewLessonMaterials: React.FC<Props> = ({ id_lecture }) => {
  
    const materials = useGetMaterials(id_lecture);
    
  return (
    <>
    <Nav />
      <body className={styles['body']}>
        <div className={styles['body--text']}><p className={styles["p-style"]}>View <span className={styles['body--text2']}>lecture </span> materials</p></div>
        <div className={styles['body--content']}>
        <ol className={styles['scrollable-list']}>
            {materials.map((material) => (
              <li key={material.id} className={styles["li-style"]}>
                <a href="http://localhost:3000/ViewMaterial" target="_blank" rel="noopener noreferrer">
                  {material.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </body>
    </>
  );
};


export default ViewLessonMaterials;