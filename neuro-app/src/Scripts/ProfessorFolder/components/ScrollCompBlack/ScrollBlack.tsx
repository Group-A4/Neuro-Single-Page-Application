import React from 'react';
import styles from './Body.module.css';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photo_option from './dots.png';
import withAuth from '../../../../WithAuth';
import { useEffect } from 'react';

interface ScrollBlackProps {
  idExam?: number | null;
  codeExam?: string | null;
}

const isEditableExam = async (idExam: number): Promise<Boolean> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8192/exam/isEditable/idExam=${idExam}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const isEditable = await response.json();
  console.log("Aici" + isEditable);
  return isEditable;
};

const ScrollBlack: React.FC<ScrollBlackProps> = ({ idExam, codeExam }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isExamEditable, setIsExamEditable] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('token');
  const handleDropDownFocus = (state: boolean) => {
    setOpen(!state);
  };
  console.log(open, dropdownRef.current);

  const navigate = useNavigate();

  const handleEditQuestions = () => {
    navigate('/EditQuestions', { state: { prop1: codeExam } });
  };

  const handleClickOutsideDropDown = (e: any) => {
    if (open && !dropdownRef.current?.contains(e.target as Node))
      setOpen(false);
  };

  const handleDeleteExam = async () => {
    if (idExam) {
      try {
        const response = await fetch(`http://localhost:8192/exam/idExam=${idExam}`, {
          method: 'DELETE',
          headers: {  Authorization: `Bearer ${token}` },
        });
        // Handle response as needed
      } catch (error) {
        console.log('Error deleting exam:', error);
      }
      window.location.reload();
    }
  };

  useEffect(() => {
    const checkExamEditable = async () => {
      const isEditable = await isEditableExam(idExam as number);
      setIsExamEditable(isEditable as boolean);
    };
    checkExamEditable();
  }, [idExam]);

  window.addEventListener('click', handleClickOutsideDropDown);
  console.log(isExamEditable);

  return (
    <div className={styles['body-scroll']} ref={dropdownRef}>
      <button onClick={(e) => handleDropDownFocus(open)}>
        <img src={photo_option} alt="" />
      </button>
      {open && (
        <ul>
          { isExamEditable && (
            <li>
            <div className={styles.edit} onClick={handleEditQuestions}>Edit</div>
          </li>
          )}
        
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

export default withAuth(ScrollBlack, [1]);