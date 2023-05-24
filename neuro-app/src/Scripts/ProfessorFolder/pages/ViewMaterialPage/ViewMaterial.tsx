import React, { useEffect, useState } from 'react';

import { GetMaterialById } from '../../components/material/getMaterialById';
import Nav from '../../../NavBarFolder/Nav';
import styles from './ViewMaterial.module.css';
import { Link, useParams } from 'react-router-dom';
import withAuth from '../../../../WithAuth';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewMaterial: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const materialId = location.state.materialId;
    const material = GetMaterialById(Number(materialId));

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