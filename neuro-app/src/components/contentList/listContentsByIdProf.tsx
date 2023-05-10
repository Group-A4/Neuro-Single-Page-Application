import React, { useEffect, useState } from 'react';
import styles from './contentList.module.css';

interface Props {
  professorId: number;
}

interface Content {
  id: number;
  link: string;
  name: string;
}

const ContentList: React.FC<Props> = ({ professorId }) => {
  const [contents, setContents] = useState<Content[]>([]);
  const url = `http://localhost:8191/content/professor/${professorId}`;
    
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setContents(data));
  }, [professorId]);

  return (
    <div className={styles.div}>
      <h2>Your content</h2>
      <div className={styles.list}>
        <ul>
          {contents.map(content => (
            <li key={content.id}>
              <a href={content.link}>{content.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentList;
