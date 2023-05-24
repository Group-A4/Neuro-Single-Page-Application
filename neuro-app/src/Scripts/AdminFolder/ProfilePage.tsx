import { Link } from 'react-router-dom';
import Nav from "./NavBarAdmin/Nav";
import "./ProfilePage.css";
import WithAuth from "../../WithAuth";

const Body: React.FC<{}> = () => {
 /* const [userDetails,setUserDetails]=useState({});
  useEffect( () => {
      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(data=> setUserDetails(data))
      .catch(error => console.error(error));
  },[])*/
    return (
        <div>
            <div className="tables">
                <div className="profile-page">
                    <h5>GENERAL INFORMATION</h5>
                    {<span className="categories"> FIRST NAME:  {/* {userDetails.firstName}   */} </span> }
                    {<span className="categories"> LAST NAME:  {/* {userDetails.lastName}   */} </span> }
                    <span className="categories">REGISTRATION NUMBER:  </span>
                    <span className="categories">YEAR OF STUDY: </span>
                    <span className="categories">COURSES: </span>
                    <div className="courses-list">
                        <div className="course">curs 1</div>
                        <div className="course">curs 1</div>
                        <div className="course">curs 1</div>
                        <div className="course">curs 1</div>
                        <div className="course">curs 1</div>
                    </div>
                </div>
                <div className="profile-page">
                    <h5>ACCOUNT INFORMATION</h5>
                    <span className="categories">USERNAME: </span>
                    <span className="categories">PERSONAL EMAIL: </span>
                    <span className="categories">UNIVERSITY EMAIL: </span>
                    <Link to='/EditPasswordPage'>
                    <button className="change-password"> CHANGE PASSWORD </button>
                    </Link>
                    <Link to='/EditPersEmailPage'>
                    <button className="change-pers-email"> CHANGE PERSONAL EMAIL </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
const styles = {
    backgroundColor: "#bfb3b3b3",
    position: "absolute" as const,
    height: "100%",
    width: "100%",
  };
  
  function ProfilePage() {
    return (
      <div style={styles}>
        <Nav />
        <Body />
      </div>
    );
  }
  

export default WithAuth(ProfilePage, [0]);
