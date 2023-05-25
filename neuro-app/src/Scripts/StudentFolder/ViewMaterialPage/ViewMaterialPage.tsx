import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Nav from '../NavBarStudent/Nav';
import styles from './ViewMaterialPage.module.css';
import withAuth from '../../../WithAuth';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Material {
    id: number;
    title: string;
    markdownText: string;
    html: string;
  }

const ViewMaterialPageStudent: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [material, setMaterial] = useState<Material>({
        id: 0,
        title: '',
        markdownText: '',
        html: '',
      });


    const { materialId } = useParams<{ materialId: string }>();

    const apiUrl = 'http://localhost:8192/materials/id_lecture=';
    const completeUrl = `${apiUrl}${materialId}`;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(completeUrl);
            const data = await response.json();
            setMaterial(data);
        } catch (error) {
            console.error('Error fetching material data:', error);
        }
        };

        fetchData();
    }, []);


    return (
        <>
            <Nav />

            <body className={styles['body']}>
                <div className={styles['body--content']}>
                    <div className={styles['body--content--description']}>
                        <div className={styles['body--text']}>{material.title}</div>
                        <div className={styles['text']} dangerouslySetInnerHTML={{ __html: material.html }} />
                    </div>
                     <div>
                      <a   className={styles["bn11"]}> {/*onClick={() => {navigate(`/ViewLectures/${location.state.courseId}`)} } */}
                        Back
                    </a> 
                    </div> 
                </div>
            </body>
        </>
    );
};

export default withAuth(ViewMaterialPageStudent, [1, 2]);
