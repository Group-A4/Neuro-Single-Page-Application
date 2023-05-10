import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../NavBarAdmin/Nav';


const Body: React.FC<{}> = () => {
  const [nrMatricol,setNrMatricol]=useState('');
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setNrMatricol(event.target.value);
  }
  return (
    <body>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Enter the id of the account you want to modify:
            <br></br>
            <br></br>
            <input type="text" value={nrMatricol} onChange={handleChange} />
            <br></br>
            <br></br>
            <Link to="/ModifyOptionsPage">
            <button type="submit">Submit</button>
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
