import React, { useState, useEffect, useRef } from 'react';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";
import WithAuth from "../../WithAuth";

interface FormValues {
  oldPassword: string;
  newPassword: string;
}
const initialFormValues: FormValues = {
  oldPassword: "",
  newPassword: "",
};

const Body: React.FC<{}> = () => {
  
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValues((prevFormValues: FormValues) => ({ ...prevFormValues, submitted: true }));
  }

  return (
    <div>
      <div className="center-bubble">
      <form onSubmit={handleSubmit}>
    
        <label htmlFor="default-name">Current password</label> 
        <br />
        <input width="80" type="text" id="default-password" name="default-password" onChange={handleChange} />
        <br /><br />
        <label htmlFor="newName">New password:</label> 
        <br />
        <input type="text" id="newPassword" name="newPassword" value={formValues.newPassword}  onChange={handleChange} />
        <br /><br />
        <input type="submit" value="Edit password" />
        
  
      </form>
          </div>
      </div>
  );
}


function EditPassword() {
  return (
      <div>
          <Nav />
          <Body />
      </div>
  );
}

export default WithAuth(EditPassword, [0]);
