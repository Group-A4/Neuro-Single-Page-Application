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

    const navigate = useNavigate();
    const goToViewSubjects = (courseId : number) => {
        navigate(`/ViewLectures/${courseId}`); 
      };

    const profileStudent: Student[] = ([]);

    useEffect(() => {
       const fetchData = async () => {
        const response = await fetch('http://localhost:8192/students/36');
        const data = await response.json();
      };
      fetchData();
    }, []);

    return (
        <>
            <div className={styles['body--container']}>
                    <div className={styles['body--title']}>
                        My Profile
                    </div>

                {profileStudent.map(profile => (
                  <div className={styles['course-container']} key={profile.id}>
                    <div className={styles['course-title']}>
                        {profile.firstName}
                    </div>
                  </div>
                ))}
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
