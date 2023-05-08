

import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";


const AdminPage = () =>  {
  return (
    <div className="main-body">
      <div> <Nav /> </div>
      <div className="admin-properties-container">

        <Link to="/CreateAccount">
          <img className='button-img' src='images/AdminPageImages/create-account.png' alt="icon-create-account" />
        </Link>

        <Link to="/">
          <img className='button-img' src='images/AdminPageImages/view-materials.png' alt="icon-create-account" />
        </Link>

        <Link to="/ChooseAccountPage">
          <img className='button-img' src='images/AdminPageImages/modify-delete-account.png' alt="icon-create-account" />
        </Link>
      </div>
    </div>

  );
}

export default AdminPage;
