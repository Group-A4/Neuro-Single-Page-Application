import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import Nav from '../NavBarStudent/Nav';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type Student ={
  id: number;
  lastName: string;
  firstName: string;
  code: string;
  emailFaculty: string;
  emailPersonal: string;
  year: number;
  semester: number;

}

const Body: React.FC<{}> = () => {

  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8192/students/36');
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

    return (
        <>
            <div className={styles['body--container']}>
                    <div className={styles['body--title']}>
                      My Profile
                    </div>

                    <div className={styles['info--container']}>
                      <div className={styles['info--profile']}>
                        <p>Last Name: {student.lastName}</p>
                        <p>First Name: {student.firstName}</p>
                        <p>Code: {student.code}</p>
                        <p>Email: {student.emailFaculty}</p>
                        <p>Email Personal: {student.emailPersonal}</p>
                        <p>Year: {student.year}</p>
                        <p>Semester: {student.semester}</p>
                      </div>
                    </div>
                    
            </div>
        </>
    )
}


const ProfileStudent: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['Body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default ProfileStudent;
