import React, { useState, useRef } from 'react';
import styles from './Body.module.css';
import { Link } from 'react-router-dom';
import photo_option from './option.png';

interface ScrollProps {
  onDeleteLecture: () => void;
  onRenameLecture: (newTitle: string) => void;
}

const Scroll: React.FC<ScrollProps> = ({ onDeleteLecture, onRenameLecture }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropDownFocus = (state: boolean) => {
    setOpen(!state);
  };

  const handleClickOutsideDropDown = (e: any) => {
    if (open && !dropdownRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const handleDeleteLecture = () => {
    setOpen(false);
    onDeleteLecture(); // Apelăm funcția de ștergere a lectiei din componenta părinte (Lectures)
  };

  const handleRenameLecture = () => {
    setOpen(false);
    const newTitle = prompt('Enter new lecture title:');
    if (newTitle) {
      onRenameLecture(newTitle);
    }
  };

  window.addEventListener('click', handleClickOutsideDropDown);

  return (
    <div className={styles['body-scroll']} ref={dropdownRef}>
      <button onClick={() => handleDropDownFocus(open)}>
        <img src={photo_option} alt="" />
      </button>
      {open && (
        <ul>
          <li>
            <Link to="/AddMAterialsLesson">Add materials </Link>
          </li>
          <li>
            <Link to="/ViewLessonMaterials">View materials </Link>
          </li>
          <li>
            <a href="" onClick={handleRenameLecture}>Rename</a>
          </li>
          <li>
            <a href="" onClick={handleDeleteLecture}>Delete</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Scroll;