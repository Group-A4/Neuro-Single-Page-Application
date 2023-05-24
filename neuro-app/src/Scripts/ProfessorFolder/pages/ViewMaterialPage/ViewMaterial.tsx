import React, { useEffect, useState } from 'react';

import { GetMaterialById } from '../../components/material/getMaterialById';
import Nav from '../../../NavBarFolder/Nav';
import styles from './ViewMaterial.module.css';
import { Link, useParams } from 'react-router-dom';
import withAuth from '../../../../WithAuth';

const ViewMaterial: React.FC<{}> = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const material = GetMaterialById(Number(id));

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
                    <Link to={`/ViewLectureMaterials`} className={styles["bn11"]}>
                        Back
                    </Link>
                    </div>
                </div>
            </body>
        </>
    );
};

export default withAuth(ViewMaterial, [1, 2]);