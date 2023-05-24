import React, { useEffect, useState } from 'react';
import styles from './LectureMaterials.module.css';
import Nav from '../nav/Nav';
import { SERVER_ADDRESS } from '../../../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, LinkProps } from 'react-router-dom';
import withAuth from '../../../../WithAuth';
import { useNavigate } from 'react-router-dom';



type Props = {
  id_lecture: string;
};

const useGetMaterials = (id_lecture: string) => {
  const token = localStorage.getItem('token');

  const [materials, setMaterials] = useState<any[]>([]);

  const fetchMaterials = async (id_lecture: string) => {
    try {
      const response = await fetch(
        SERVER_ADDRESS + `/materials/id_lecture=${id_lecture}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
  const token = localStorage.getItem('token');
  const { materials, fetchMaterials } = useGetMaterials(id_lecture); // Destructure fetchMaterials

  const navigate = useNavigate();

  const handleDelete = async (materialId: string) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await fetch(
          SERVER_ADDRESS + `/materials/${materialId}`,
          { method: 'DELETE' ,
           headers: { Authorization: `Bearer ${token}` } }
        );
        // Refresh the materials after deleting
        fetchMaterials(id_lecture);
      } catch (error) {
        console.error(error);
      }
    }

  
  };

  const user = JSON.parse(localStorage.getItem('utilizator') || '{}');

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
                  <a onClick={() => {navigate('/ViewMaterial', {state:{materialId: material.id, lectureId: id_lecture}})} } className={styles['a--style']}>
                    {material.title}
                  </a>
                </div>
                {user.role === 1 && (
                  <div className={styles['right-side']}>
                    <a onClick={()=>{navigate('/UpdateMaterial',{state:{materialId: material.id, lectureId: id_lecture}});}} >
                    <button
                      className={styles['editButton']} 
                    >
                      <FontAwesomeIcon icon={faEdit} className={styles['Icon']} /> <p className={styles['p-delete']}>Edit</p>
                    </button>
                    </a>
                    <button
                      className={styles['deleteButton']}
                      onClick={() => handleDelete(material.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className={styles['Icon']} /> <p className={styles['p-delete']}>Delete</p>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ol>
          {user.role === 1 && (
            <a onClick={()=>{navigate('/CreateMaterial',{state:{lectureId: id_lecture}});}}>
              <button className={styles['createButton']}>
                Create new material
              </button>
            </a>
          )} 
        </div>
      </body>
    </>
  );
};

export default withAuth(ViewLessonMaterials, [1, 2]);