import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";


interface FormValues {
  oldFirstName: string;
  newFirstName: string;
  submitted: boolean;
}
const initialFormValues: FormValues = {
  
  oldFirstName: "",
  newFirstName: "",
  submitted: false,
};
const Body: React.FC<{}> = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValues((prevFormValues: FormValues) => ({ ...prevFormValues, submitted: true }));
/*
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Modificarea numelui a fost realizata cu succes!');
      return response.json();
    })
    .then((text) => {
      if (text) {
        return JSON.parse(text);
      } else {
        throw new Error('Empty response');
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
    */
};
  
  return (
    <body>
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label>
            Current first name:
            <br></br>
            <input width="80"type="text" value={formValues.oldFirstName} onChange={handleChange} />
            <br></br>
            <br></br>
            New first name:
            <br></br>
            <input type="text" value={formValues.newFirstName} onChange={handleChange} />
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

