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
                <div className={styles['body--text']}>
                    View lecture materials
                </div>

                <div className={styles['body--content']}>
                    <div className={styles['body--content--title']}>
                        {material.title}
                    </div>
                    <div className={styles['body--content--description']}>
                        <div dangerouslySetInnerHTML={{ __html: material.html }} />
                    </div>
                </div>

            </body>

        </>
    );
};

export default ViewLessonMaterials;