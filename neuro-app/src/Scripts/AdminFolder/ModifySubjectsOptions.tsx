

import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ModifyOptions.css";


function ModifySubjects() {
    return (
        <div>
            <Nav />
            <div className='edit-container'>
                <Link to='/EditSubjectName'>
                    <img className='button-category' src='images/AdminPageImages/edit-name.png' alt="" />
                </Link>
            </div>
        </div>
    );
}

export default ModifySubjects;
