

import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ModifySubjects.css";


function ModifySubjects() {

    var idUs = localStorage.getItem('subjectToModify');
    const fetchUsers = async () => {
        try {
        const response = await fetch(`http://localhost:8192/courses/${idUs}`, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*'
            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        localStorage.setItem('subjectDataModify', JSON.stringify(data));
        } catch (error) {
        console.error(error);
        }
    };
    fetchUsers();




    return (
        <div>
            <Nav />
            <div className='edit-container'>
                <Link to='/EditSubjectTitle'>
                    <img className='button-category' src='images/AdminPageImages/edit-title.png' alt="" />
                </Link>
                <Link to='/EditSubjectYear'>
                    <img className='button-category' src='images/AdminPageImages/edit-year.png' alt="" />
                </Link>
                <Link to='/EditSubjectSemester'>
                    <img className='button-category' src='images/AdminPageImages/edit-semester.png' alt="" />
                </Link>
                <Link to='/EditSubjectCredits'>
                    <img className='button-category' src='images/AdminPageImages/edit-credits.png' alt="" />
                </Link>
            </div>
        </div>
    );
}

export default ModifySubjects;
