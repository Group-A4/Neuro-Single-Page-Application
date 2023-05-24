import React from 'react';
import styles from './Body.module.css';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import photo_option from './dots.png';

interface ScrollBlackProps {
  idExam?: number | null;
  code?: string | null;
}

const ScrollBlack: React.FC<ScrollBlackProps> = ({ idExam,code }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropDownFocus = (state: boolean) => {
    setOpen(!state);
  };
  console.log(open, dropdownRef.current);

  const handleClickOutsideDropDown = (e: any) => {
    if (open && !dropdownRef.current?.contains(e.target as Node))
      setOpen(false);
  };

  const handleDeleteExam = async () => {
    if (idExam) {
      try {
        const response = await fetch(`http://localhost:8192/exam/idExam=${idExam}`, {
          method: 'DELETE',
        });
        // Handle response as needed
      } catch (error) {
        console.log('Error deleting exam:', error);
      }
    }
  };

  window.addEventListener('click', handleClickOutsideDropDown);

  return (
    <div className={styles['body-scroll']} ref={dropdownRef}>
      <button onClick={(e) => handleDropDownFocus(open)}>
        <img src={photo_option} alt="" />
      </button>
      {open && (
        <ul>
          <li>
            <Link to="/EditQuestions">Edit</Link>
          </li>
          <li>
            <a href="" onClick={handleDeleteExam}>
              Delete
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ScrollBlack;