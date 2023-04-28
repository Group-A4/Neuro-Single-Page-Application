import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../NavBarAdmin/Nav';


const Body: React.FC<{}> = () => {
  const [oldPassword,setOldPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
    setNewPassword(event.target.value);
  }
  return (
    <body>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Current password:
            <br></br>
            <input width="80"type="text" value={oldPassword} onChange={handleChange} />
            <br></br>
            <br></br>
            New password:
            <br></br>
            <input type="text" value={newPassword} onChange={handleChange} />
            <br></br>
            <br></br>
            <Link to="/ModifyOptionsPage">
            <button type="submit">Edit password</button>
            </Link>
          </label>
        </form>
          </div>
      </body>
  );
}


function EditPassword() {
  return (
      <body>
          <Nav />
          <Body />
      </body>
  );
}

export default EditPassword;
