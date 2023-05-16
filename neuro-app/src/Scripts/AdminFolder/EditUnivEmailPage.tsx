import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";


const Body: React.FC<{}> = () => {
  const [oldUnivEmail,setOldUnivEmail]=useState('');
  const [newUnivEmail,setNewUnivEmail]=useState('');
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setOldUnivEmail(event.target.value);
    setNewUnivEmail(event.target.value);
  }
  return (
    <div>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Current univerisity email:
            <br></br>
            <input width="80"type="text" value={oldUnivEmail} onChange={handleChange} />
            <br></br>
            <br></br>
            New univerisity email:
            <br></br>
            <input type="text" value={newUnivEmail} onChange={handleChange} />
            <br></br>
            <br></br>
            <Link to="/ModifyOptionsPage">
            <button type="submit">Edit university email</button>
            </Link>
          </label>
        </form>
          </div>
      </div>
  );
}


function EditUnivEmail() {
  return (
      <div>
          <Nav />
          <Body />
      </div>
  );
}

export default EditUnivEmail;
