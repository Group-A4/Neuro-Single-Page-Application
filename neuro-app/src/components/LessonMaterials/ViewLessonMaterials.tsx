import React, { useEffect, useState } from 'react';
import styles from './Body.module.css';
import Nav from '../nav/Nav';
import { SERVER_ADDRESS } from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


type Props = {
  id_lecture: string;
};

const useGetMaterials = (id_lecture: string) => {
  const [materials, setMaterials] = useState<any[]>([]);

  const fetchMaterials = async (id_lecture: string) => {
    try {
      const response = await fetch(
        SERVER_ADDRESS + `/materials/id_lecture=${id_lecture}`
      );
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMaterials(id_lecture);
  }, [id_lecture]);

  return { materials, fetchMaterials }; // Return both materials and fetchMaterials
};

const ViewLessonMaterials: React.FC<Props> = ({ id_lecture }) => {
  const { materials, fetchMaterials } = useGetMaterials(id_lecture); // Destructure fetchMaterials

  const handleDelete = async (materialId: string) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await fetch(
          SERVER_ADDRESS + `/materials/${materialId}`,
          { method: 'DELETE' }
        );
        // Refresh the materials after deleting
        fetchMaterials(id_lecture);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Nav />
      <body className={styles['body']}>
        <div className={styles['body--text']}>
          <p className={styles['p-style']}>
            View <span className={styles['body--text2']}>lecture </span>
            materials
          </p>
        </div>
        <div className={styles['body--content']}>
          <ol className={styles['scrollable-list']}>
            {materials.map((material) => (
              <li key={material.id} className={styles['li-style']}>
                <div className={styles['left-side']}>
                  <a
                    className={styles['a--style']}
                    href="http://localhost:3000/ViewMaterial"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {material.title}
                  </a>
                </div>
                <div className={styles['right-side']}>
                <button
                    className={styles['editButton']}
                  >
                    <FontAwesomeIcon icon={faEdit} className={styles['Icon']} /> Edit
                  </button>
                  <button
                    className={styles['deleteButton']}
                    onClick={() => handleDelete(material.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className={styles['Icon']} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </body>
    </>
  );
};

export default ViewLessonMaterials;
