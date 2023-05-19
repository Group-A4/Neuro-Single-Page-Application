import React, { useEffect, useState } from 'react';

import { GetMaterialById } from '../../components/material/getMaterialById';
import Nav from '../../../NavBarFolder/Nav';
import styles from './ViewMaterial.module.css';
import { Link } from 'react-router-dom';

const ViewLessonMaterials: React.FC<{}> = () => {

  const material = GetMaterialById(1);

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
                    <Link to={`/ViewLessonMaterials?id_course=5`} className={styles["bn11"]}>
                        Back
                    </Link>
                    </div>
                </div>

            </body>

        </>
    );
};

export default ViewLessonMaterials;