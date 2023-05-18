import React, { useEffect, useState } from 'react';
import styles from './contentListPage.module.css';
import { SERVER_ADDRESS } from '../../../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Nav from '../nav/Nav';
import { Link } from 'react-router-dom';

interface Props {
  professorId: number;
}

interface Content {
  id: number;
  link: string;
  name: string;
}

const useGetContents = (professorId: number) => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const url = SERVER_ADDRESS + `/content/professor/${professorId}`;

    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setContents(data);
    };

    fetchData();
  }, [professorId]);

  return contents;
};

const ContentList: React.FC<Props> = ({ professorId }) => {
  const contents = useGetContents(professorId);
  const setContents = useState<Content[]>([])[1]; // Added setContents declaration

  const handleDelete = async (contentId: number) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await fetch(SERVER_ADDRESS + `/content/${contentId}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Nav />
      <body className={styles['body']}>
        <div className={styles['body--text']}>
          <p className={styles['p-style']}>
            View <span className={styles['body--text2']}>content </span>
            list
          </p>
        </div>
        <div className={styles['body--content']}>
          <ol className={styles['scrollable-list']}>
            {contents.map((content) => (
              <li key={content.id} className={styles['li-style']}>
                <div className={styles['left-side']}>
                  <a
                    className={styles['a--style']}
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.name}
                  </a>
                </div>
                <div className={styles['right-side']}>
                  <button
                    className={styles['deleteButton']}
                    onClick={() => handleDelete(content.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles['Icon']}
                    />
                    <p className={styles['p-delete']}>Delete</p>
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <Link to={`/AddContent?id=${professorId}`}>
          <button className={styles['AddButton']}>
            Add Content
          </button>
          </Link>
        </div>
      </body>
    </>
  );
};

export { ContentList, useGetContents };
