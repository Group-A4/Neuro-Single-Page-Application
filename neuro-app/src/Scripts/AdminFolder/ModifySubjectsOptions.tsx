

import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ModifySubjects.css";


function ModifySubjects() {
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
