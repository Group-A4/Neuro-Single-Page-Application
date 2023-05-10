import React, { useEffect, useState } from 'react';

import { getMaterialById } from './material';
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
// import { Link } from 'react-router-dom';

const ViewLessonMaterials: React.FC<{}> = () => {

    const [html, setHtml] = useState(null);

  const handleOpenWindow = async (id: number) => {
    try {
      const material = await getMaterialById(id);
      setHtml(material.html);
      const newWindow = window.open('', '_blank');
      if (newWindow && material.html) {
        const code = `<html><head></head><body><div dangerouslySetInnerHTML={ {__html:${html}} } /></body></html>`;
        newWindow.document.write(code);
        newWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to open material window:', error);
    }
  };

    return (
        <>
            <Nav />
            <body className={styles['body']}>
                <div className={styles['body--text']}>
                    View lecture materials
                </div>

                <div className={styles['body--content']}>
                    {/* TODO */}
                    Material
                
                </div>

                <button onClick={() => handleOpenWindow(34)}>Open Material</button>

            </body>

        </>
    );
};

export default ViewLessonMaterials;