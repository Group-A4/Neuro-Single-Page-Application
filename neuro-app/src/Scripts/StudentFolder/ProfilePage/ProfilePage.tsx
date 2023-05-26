  import React, { useState, useEffect } from 'react';
  import styles from './ProfilePage.module.css';
  import Nav from '../NavBarStudent/Nav';
  import withAuth from '../../../WithAuth';
  import { Link } from 'react-router-dom';
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
    console.log(user.id);
    const student = useGetStudent(token,user.id);
    const courses = useGetCourses(token,user.id);
    
  
    console.log(student);
    console.log(courses);
    if (!student || !courses) {
      return <div>Loading...</div>;
    }

      return (
        <div>
      <div className="tables">
        <div className="profile-page">
          <h5>GENERAL INFORMATION</h5>
          <span className="categories">FIRST NAME: {student.firstName}</span>
          <span className="categories">LAST NAME: {student.lastName}</span>
          <span className="categories">REGISTRATION NUMBER: {student.code}</span>
          <span className="categories">YEAR OF STUDY: {student.year}</span>
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
          <span className="categories">PERSONAL EMAIL: {student.emailPersonal}</span>
          <span className="categories">UNIVERSITY EMAIL: {student.emailFaculty}</span>
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


  const useGetStudent = (token: string,studentId : number) => {
    const [student, setStudent] = useState<Student | null>(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8192/students/${studentId}`,
            { headers: { Authorization: `Bearer ${token}`, } });
          const data = await response.json();
          setStudent(data);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };

      fetchData();
    }, []);
    return student;
  }

  const useGetCourses = (token: string,studentId : number) => {
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8192/courses/student=${studentId}`,
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

  const ProfileStudent: React.FC<{}> = () => {
    return (
      <div className={styles['Body']}>
        <Nav />
        <Body />
      </div>
    );
  };
  export default withAuth(ProfileStudent, [2]);
