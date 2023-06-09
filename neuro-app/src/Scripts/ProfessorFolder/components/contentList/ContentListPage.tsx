import React, { useEffect, useState } from 'react';
import styles from './contentListPage.module.css';
import { SERVER_ADDRESS } from '../../../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Nav from '../nav/Nav';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
      const response = await fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setContents(data);
    };

    fetchData();
  }, [professorId]);

  return contents;
};

const ContentList: React.FC<Props> = ({ professorId }) => {
  const token = localStorage.getItem('token');

  const contents = useGetContents(professorId);
  const setContents = useState<Content[]>([])[1]; // Added setContents declaration


  const handleContent = (contentId: number) => {
    Swal.fire({
      title: 'Are you sure you want to delete this content?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        const handleDelete = async (contentId: number) => {
          try {
            await fetch(SERVER_ADDRESS + `/content/${contentId}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
              if (response.status === 204) {
                window.location.reload();
              }});
          } catch (error) {
            console.error(error);
          }
      };
        handleDelete(contentId);
        Swal.fire('Deleted!', 'Your content has been deleted.', 'success');
      }
    });

  }

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
                    onClick={() => handleContent(content.id)}
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