

import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ModifyOptions.css";
import { json } from 'stream/consumers';

const Body: React.FC<{}> = () => {
  return (
      <div className='edit-container'>
      <Link to='/EditFirstNamePage'>
          <img className='button-category' src='images/AdminPageImages/first-name.png' alt="" />
        </Link>
        <Link to='/EditLastNamePage'>
          <img className='button-category' src='images/AdminPageImages/last-name.png' alt="" />
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

  var idUs = localStorage.getItem('userToModify');
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8192/users/${idUs}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*'
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem('userDataModify', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
  fetchUsers();


  return (
      <div>
          <Nav />
          <Body />
      </div>
  );
}

export default AdminPage;
