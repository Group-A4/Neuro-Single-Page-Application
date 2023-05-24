import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ModifyOptions.css";
import WithAuth from "../../WithAuth";

const BodyAdmin: React.FC<{}> = () => {
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


const BodyStudent: React.FC<{}> = () => {
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

const BodyProfessor: React.FC<{}> = () => {
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
  var rolul;
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
      rolul = data.role;
      localStorage.setItem('userDataModify', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
  fetchUsers();

  ///profesor
  if(rolul == 1)
    return (
        <div>
            <Nav />
            <BodyProfessor />
        </div>
    );
  else if(rolul == 2)
    return (
      <div>
          <Nav />
          <BodyStudent />
      </div>
    );
  else
  return (
    <div>
        <Nav />
        <BodyAdmin />
    </div>
  );
}

export default WithAuth(AdminPage, [0]);
