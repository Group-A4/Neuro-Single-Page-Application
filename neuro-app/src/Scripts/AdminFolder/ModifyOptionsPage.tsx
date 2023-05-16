

import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ModifyOptions.css";

const Body: React.FC<{}> = () => {
  return (
      <div className='edit-container'>
      <Link to='/EditFirstNamePage'>
          <img className='button-category' src='images/AdminPageImages/first-name.png' alt="" />
        </Link>
        <Link to='/EditLastNamePage'>
          <img className='button-category' src='images/AdminPageImages/last-name.png' alt="" />
        </Link>
        <Link to='/EditRolePage'>
          <img className='button-category' src='images/AdminPageImages/role.png' alt="" />
        </Link>
        <Link to='/EditPasswordPage'>
          <img className='button-category' src='images/AdminPageImages/password.png' alt=""  />
          </Link>
          <Link to='/EditUnivEmailPage'>
          <img className='button-category'src='images/AdminPageImages/univ-email.png' alt=""  />
          </Link>
          <Link to='/EditPersEmailPage'>
          <img className='button-category' src='images/AdminPageImages/pers-email.png' alt="" />
          </Link>
        </div>
      
  );
}

function AdminPage() {
  return (
      <div>
          <Nav />
          <Body />
      </div>
  );
}

export default AdminPage;
