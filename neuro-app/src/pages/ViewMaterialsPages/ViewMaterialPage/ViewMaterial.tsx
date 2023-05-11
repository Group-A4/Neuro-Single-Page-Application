import React, { useEffect, useState } from 'react';

import { GetMaterialById } from './material';
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';

const ViewLessonMaterials: React.FC<{}> = () => {

  const material = GetMaterialById(73);
  console.log(material.html);

    return (
        <>
            <Nav />
            <body className={styles['body']}>

                <div className={styles['body--content']}>
                    <div className={styles['body--content--description']}>
                        <div className={styles['body--text']}>{material.title}</div>
                        <div className={styles['text']} dangerouslySetInnerHTML={{ __html: material.html }} />
                    </div>
                    <span className={styles.dot}></span>
                </div>

            </body>

        </>
    );
};

export default ViewLessonMaterials;