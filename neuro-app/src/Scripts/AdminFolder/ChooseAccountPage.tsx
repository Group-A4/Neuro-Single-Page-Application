

import { Link } from 'react-router-dom';
import Nav from "./NavBarAdmin/Nav";
import "./ChooseAccount.css";

const Body: React.FC<{}> = () => {
  return (
      <div className="choose-table">
        <h3> Select the account you want to modify or delete</h3>
        <div className="user-list">
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
            <Link to="/ModifyOptionsPage">
              <button className="modify-button"> Modify account</button>
              </Link>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
          <div className="user-options">
            <p> user </p>
            <div className="buttons">
              <button className="modify-button"> Modify account</button>
              <button className="delete-button"> Delete account</button>
            </div>
          </div>
        </div>
      </div>
  );
}

function ChooseAccount() {
  return (
    <body >
      <Nav />
      <Body />
    </body>
  );
}

export default ChooseAccount;
