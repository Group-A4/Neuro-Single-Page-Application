import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";


const Body: React.FC<{}> = () => {
  const [oldPersEmail,setOldPersEmail]=useState('');
  const [newPersEmail,setNewPersEmail]=useState('');
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setOldPersEmail(event.target.value);
    setNewPersEmail(event.target.value);
  }
  return (
    <body>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Current personal email:
            <br></br>
            <input width="80"type="text" value={oldPersEmail} onChange={handleChange} />
            <br></br>
            <br></br>
            New personal email:
            <br></br>
            <input type="text" value={newPersEmail} onChange={handleChange} />
            <br></br>
            <br></br>
            <Link to="/ModifyOptionsPage">
            <button type="submit">Edit personal email</button>
            </Link>
          </label>
        </form>
          </div>
      </body>
  );
}


function EditPersEmail() {
  return (
      <body>
          <Nav />
          <Body />
      </body>
  );
}

export default EditPersEmail;
