

import { Link } from 'react-router-dom';
import Nav from '../NavBarAdmin/Nav';


const Body: React.FC<{}> = () => {
  return (
    <body>
      <div className="admin-properties-container">
      
          <button className="create-account" >
            <p> Create an account </p>
            <img src='images/icon-create-account.png' alt="icon-create-account" width="130" height="130" />
          </button>

        <button className="view-materials">
          <p> View materials </p>
          <img src="images/icon-modify-account.png" alt="icon-view-materials" width="130" height="130" />
        </button>

        <Link to="/ChooseAccountPage">
          <button className="modify-account">
            <p>Modify an account</p>
            <br />
            <img src="images/icon-modify-account.png" alt="modify" width="130" height="130" />
            <br />
          </button>
        </Link>

        <button className="delete-account">
          <p>Delete an account</p>
          <br />
          <img src="images/icon-delete-account.png" alt="delete" width="130" height="130" />
          <br />
        </button>
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
