  import React, { useState, useEffect } from 'react';
  import styles from './ProfilePage.module.css';
  import Nav from '../../components/nav/Nav';
  import withAuth from '../../../../WithAuth';
  import { Link } from 'react-router-dom';
  type Proffesor ={
    id: number,
    lastName: string,
    firstName: string,
    code: string,
    emailFaculty: string,
    emailPersonal: string,
    degree: string
  }
  type Course = { 
  id: number,
  title: string,
  year: number,
  semester: number,
  credits: number
  }

  const Body: React.FC<{}> = () => {
    const user = JSON.parse(localStorage.getItem('utilizator') || '{}');
  
    const token = localStorage.getItem('token') || '';
    const proffesor = useGetProffesor(token,user.id);
    const courses = useGetCourses(token,user.id);
    
  
    console.log(proffesor);
    console.log(courses);
    if (!proffesor || !courses) {
      return <div>Loading...</div>;
    }

      return (
        <div>
      <div className="tables">
        <div className="profile-page">
          <h5>GENERAL INFORMATION</h5>
          <span className="categories">FIRST NAME: {proffesor.firstName}</span>
          <span className="categories">LAST NAME: {proffesor.lastName}</span>
          <span className="categories">CODE : {proffesor.code}</span>
          <span className="categories">COURSES:</span>
          <div className="courses-list">
            {
            Array.isArray(courses)?
              courses.map((course) => (
                <div className="course" key={course.id}>
                  {course.title}
                </div>
              ))
              :<div className="course" >
                <span className="categories">NO COURSES</span>
              </div>
            }
            
          </div>
        </div>
        <div className="profile-page">
          <h5>ACCOUNT INFORMATION</h5>
          <span className="categories">PERSONAL EMAIL: {proffesor.emailPersonal}</span>
          <span className="categories">UNIVERSITY EMAIL: {proffesor.emailFaculty}</span>
          <Link to='/EditPasswordPage'>
            <button className="change-password">CHANGE PASSWORD</button>
          </Link>
          <Link to='/EditPersEmailPage'>
            <button className="change-pers-email">CHANGE PERSONAL EMAIL</button>
          </Link>
        </div>
      </div>
    </div>
      )
  }


  const useGetProffesor = (token: string,proffesorId : number) => {
    const [proffesor, setProfessor] = useState<Proffesor | null>(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8192/professors/${proffesorId}`,
            { headers: { Authorization: `Bearer ${token}`, } });
          const data = await response.json();
          setProfessor(data);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };

      fetchData();
    }, []);
    return proffesor;
  }

  const useGetCourses = (token: string,professorId : number) => {
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8192/courses/professor=${professorId}`,
            { headers: { Authorization: `Bearer ${token}`, } });
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };

      fetchData();
    }, []);
    return courses;
  }

  const ProfileProfessor: React.FC<{}> = () => {
    return (
      <div className={styles['Body']}>
        <Nav />
        <Body />
      </div>
    );
  };
  export default withAuth(ProfileProfessor, [1]);
