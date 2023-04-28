

import { Link } from 'react-router-dom';
import Nav from '../NavBarAdmin/Nav';

const Body: React.FC<{}> = () => {
  return (
    <body>
      <div className='edit-container'>
      <Link to='/EditFirstNamePage'>
          <img className='button-img' src='images/first-name.png' alt="" width="290" height="70" />
        </Link>
        <Link to='/EditLastNamePage'>
          <img className='button-img' src='images/last-name.png' alt=""  width="290" height="70" />
        </Link>
        <Link to='/EditRolePage'>
          <img className='button-img' src='images/role.png' alt=""  width="290" height="70" />
        </Link>
        <Link to='/EditPasswordPage'>
          <img className='button-img' src='images/password.png' alt=""  width="290" height="70" />
          </Link>
          <Link to='/EditUnivEmailPage'>
          <img className='button-img'src='images/univ-email.png' alt=""  width="290" height="70" />
          </Link>
          <Link to='/EditPersEmailPage'>
          <img className='button-img' src='images/pers-email.png' alt=""  width="290" height="70" />
          </Link>
        </div>
      </body>
  );
}

function AdminPage() {
  return (
      <body >
         <Nav />
          <Body />
      </body>
  );
}

export default AdminPage;
