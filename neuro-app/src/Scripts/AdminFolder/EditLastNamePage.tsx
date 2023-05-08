import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';


const Body: React.FC<{}> = () => {
  const [oldLastName,setOldLastName]=useState('');
  const [newLastName,setNewLastName]=useState('');
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setOldLastName(event.target.value);
    setNewLastName(event.target.value);
  }
  return (
    <body>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Current last name:
            <br></br>
            <input width="80"type="text" value={oldLastName} onChange={handleChange} />
            <br></br>
            <br></br>
            New last name:
            <br></br>
            <input type="text" value={newLastName} onChange={handleChange} />
            <br></br>
            <br></br>
            <Link to="/ModifyOptionsPage">
            <button type="submit">Edit last name</button>
            </Link>
          </label>
        </form>
          </div>
      </body>
  );
}


function EditLastName() {
  return (
      <body>
          <Nav />
          <Body />
      </body>
  );
}

export default EditLastName;
