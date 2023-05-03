import { Link } from 'react-router-dom';
import Nav from "../NavBarFolder/Nav";

function App() {
  const handleCreateAccountClick = () => {
    // tratamentul evenimentului de click pe butonul "Create an account"
  };

  const handleViewMaterialsClick = () => {
    // tratamentul evenimentului de click pe butonul "View materials"
  };

  const handleModifyAccountClick = () => {
    // tratamentul evenimentului de click pe butonul "Modify an account"
  };

  const handleDeleteAccountClick = () => {
    // tratamentul evenimentului de click pe butonul "Delete an account"
  };

  return (

      <div>
        <Nav />
        <div className="admin-properties-container">
          <Link to="/CreateAccount">
            <button className="create-account" onClick={handleCreateAccountClick}>
              <p> Create an account </p>
              <img src='images/icon-create-account.png' alt="icon-create-account" width="130" height="130" />
            </button>
          </Link>

          <button className="view-materials" onClick={handleViewMaterialsClick}>
            <p> View materials </p>
            <img src="images/icon-view-materials.png" alt="icon-view-materials" width="130" height="130" />
          </button>

          <Link to="/ModifyAccount">
            <button className="modify-account" onClick={handleModifyAccountClick}>
              <p>Modify an account</p>
              <br />
              <img src="images/icon-modify-account.png" alt="modify" width="130" height="130" />
              <br />
            </button>
          </Link>

          <Link to="/DeleteAccount">
            <button className="delete-account" onClick={handleDeleteAccountClick}>
              <p>Delete an account</p>
              <br />
              <img src="images/icon-delete-account.png" alt="delete" width="130" height="130" />
              <br />
            </button>
          </Link>
        </div>
      </div>
  );
}

export default App;
