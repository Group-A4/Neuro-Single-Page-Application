import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ChooseCreate.css";
import WithAuth from "../../WithAuth";


function SelectCreateAccount() {
    return (
        <div className="main-body">
            <div> <Nav /> </div>
            <div className="button-container">
                <Link to="/CreateAdmin">
                    <img className="button-2" src='images/AdminPageImages/create-account.png' alt="create-account" />
                </Link>

                <Link to="/CreateProfessor">
                    <img className="button-2" src='images/AdminPageImages/create-subject.png' alt="view-materials" />
                </Link>

                <Link to="/CreateStudent">
                    <img className="button-2" src='images/AdminPageImages/create-subject.png' alt="view-materials" />
                </Link>


            </div>
        </div>

    );
}

export default WithAuth(SelectCreateAccount, [0]);