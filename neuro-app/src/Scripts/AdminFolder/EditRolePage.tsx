import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";


const Body: React.FC<{}> = () => {
  const [oldFirstName, setOldFirstName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldFirstName(event.target.value);
    setNewFirstName(event.target.value);
  }
  return (
    <body>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Choose the role you want to assign to the user:
            <br></br>
            <br></br>
            <select className="select-button">
              <option>
                Admin
              </option>
              <option >
                Profesor
              </option>
              <option >
                Student
              </option>

            </select>
            <br></br>
            <br></br>
            <Link to="/ModifyOptionsPage">
              <button type="submit">Edit role</button>
            </Link>
          </label>
        </form>
      </div>
    </body>
  );
}


function ModifyOptions() {
  return (
    <body>
      <Nav />
      <Body />
    </body>
  );
}

export default ModifyOptions;
