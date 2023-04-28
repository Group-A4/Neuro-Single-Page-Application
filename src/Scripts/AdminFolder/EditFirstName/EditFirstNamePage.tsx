import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../NavBarAdmin/Nav';


const Body: React.FC<{}> = () => {
  const [oldFirstName,setOldFirstName]=useState('');
  const [newFirstName,setNewFirstName]=useState('');
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setOldFirstName(event.target.value);
    setNewFirstName(event.target.value);
  }
  return (
    <body>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Current first name:
            <br></br>
            <input width="80"type="text" value={oldFirstName} onChange={handleChange} />
            <br></br>
            <br></br>
            New first name:
            <br></br>
            <input type="text" value={newFirstName} onChange={handleChange} />
            <br></br>
            <br></br>
            <Link to="/ModifyOptionsPage">
            <button type="submit">Edit first name</button>
            </Link>
          </label>
        </form>
          </div>
      </body>
  );
}


function EditFirstName() {
  return (
      <body>
          <Nav />
          <Body />
      </body>
  );
}

export default EditFirstName;
