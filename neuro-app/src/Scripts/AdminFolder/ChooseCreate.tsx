
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./ChooseCreate.css";


function ChooseCreate() {
    return (
        <div className="main-body">
            <div> <Nav /> </div>
            <div className="button-container">
                <Link to="/CreateAccount">
                    <img className="button-2" src='images/AdminPageImages/create-account.png' alt="create-account" />
                </Link>

                <Link to="/CreateSubject">
                    <img className="button-2" src='images/AdminPageImages/create-subject.png' alt="view-materials" />
                </Link>
            </div>
        </div>

    );
}

export default ChooseCreate;
