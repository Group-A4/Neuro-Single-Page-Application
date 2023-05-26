import React, { useEffect, useState } from 'react';

import { GetMaterialById } from '../../components/material/getMaterialById';
import NavProf from '../../../NavBarFolder/Nav';
import NavStud from '../../../StudentFolder/NavBarStudent/Nav';
import styles from './ViewMaterial.module.css';
import withAuth from '../../../../WithAuth';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewMaterial: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const materialId = location.state?.materialId;

    useEffect(() => {
        if(!materialId){
            navigate('/');
        }
    }, [materialId, navigate]);


    const material = GetMaterialById(Number(materialId));

    return (
        <>
            {localStorage.getItem('role') === '1' ? <NavProf /> : <NavStud />}
            <body className={styles['body']}>
                <div className={styles['body--content']}>
                    <div className={styles['body--content--description']}>
                        <div className={styles['body--text']}>{material.title}</div>
                        <div className={styles['text']} dangerouslySetInnerHTML={{ __html: material.html }} />
                    </div>
                    <div>
                    <a onClick={() => {navigate('/ViewLectureMaterials', {state:{lectureId: location.state.lectureId}})} }  className={styles["bn11"]}>
                        Back
                    </a>
                    </div>
                </div>
            </body>
        </>
    );
};

export default withAuth(ViewMaterial, [1, 2]);