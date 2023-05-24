import { Link } from "react-router-dom";
import Nav from "./NavBarAdmin/Nav";
import "./AdminPage.css";

const AdminPage = () => {
  return (
    <div className="main-body">
      <div>
        {" "}
        <Nav />{" "}
      </div>
      <div className="admin-properties-container">
        <Link to="/ChooseCreate">
          <img
            className="button-img"
            src="images/AdminPageImages/create-button.png"
            alt="create-account"
          />
        </Link>

        <Link to="/">
          <img
            className="button-img"
            src="images/AdminPageImages/view-materials.png"
            alt="view-materials"
          />
        </Link>

        <Link to="/ChooseAccountPage">
          <img
            className="button-img"
            src="images/AdminPageImages/modify-delete-account.png"
            alt="modify-delete-account"
          />
        </Link>

        <Link to="/ChooseSubjects">
          <img
            className="button-img"
            src="images/AdminPageImages/modify-subject.png"
            alt="modify-delete-subjects"
          />
        </Link>

        <Link to="/modifyquizztime">
          <img
            className="button-img"
            src="images/AdminPageImages/create-account.png"
            alt="Modify Quizz Time"
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
