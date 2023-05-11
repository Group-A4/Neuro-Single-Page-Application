import React, { useEffect, useState } from 'react';

import { GetMaterialById } from './material';
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
import { Link } from 'react-router-dom';

const ViewLessonMaterials: React.FC<{}> = () => {

  const material = GetMaterialById(75);

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