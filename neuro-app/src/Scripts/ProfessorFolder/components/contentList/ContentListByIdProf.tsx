import { async } from 'q';
import React, { useEffect, useState } from 'react';
import styles from './contentList.module.css';
import { SERVER_ADDRESS } from '../../../../config/config';

interface Props {
  professorId: number;
}

interface Content {
  id: number;
  link: string;
  name: string;
}

const useGetContents = (professorId: number) => {
  const token = localStorage.getItem('token');
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const url = SERVER_ADDRESS + `/content/professor/${professorId}`;

    const fetchData = async () => {
      const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setContents(data);
    };

    fetchData();
  }, [professorId]);

  return contents;
};

const ContentList: React.FC<Props> = ({ professorId }) => {
  const contents = useGetContents(professorId);

  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>Your content</h2>
      <div className={styles.list}>
        <ul>
          {contents.map(content => (
            <li key={content.id}>
              <a href={content.link} target="_blank">{content.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ContentList, useGetContents};
