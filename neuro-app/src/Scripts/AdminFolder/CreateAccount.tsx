import React, { useState } from "react";
import Nav from "./NavBarAdmin/Nav";
import "./CreateAccount.css"

interface FormValues {
  firstName: string;
  lastName: string;
  password: string;
  emailFaculty: string;
  emailPersonal: string;
  role: string;
  submitted: boolean;
}

const initialFormValues: FormValues = {
  firstName: "",
  lastName: "",
  password: "",
  emailFaculty: "",
  emailPersonal: "",
  role: "",
  submitted: false,
};

///500
///400 mail deja utilizat
const CreateAccount = () => {
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

    const url = "http://localhost:8192/users/create";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formValues)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Crearea contului a fost realizata cu succes!");
      return response.text();
    })
    .then(text => {
      if (text.trim().length > 0) {
        return JSON.parse(text);
      } else {
        return {};
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
    
};


  return (
      <div className="create-account-page">
        <div>
          <Nav />
        </div>
        <div className="body-text">
                Please insert the information for creating an account
        </div>
        <div className="create-account-container">
          <div>
            <form onSubmit={handleSubmit} className="create-form">
              <label className="lab">
                First Name
                <input className="inp" type="text" name="firstName" value={formValues.firstName} onChange={handleChange} />
              </label>
              <label className="lab">
                Last Name 
                <input className="inp" type="text" name="lastName" value={formValues.lastName} onChange={handleChange} />
              </label>
              <label className="lab">
                Password 
                <input className="inp" type="password" name="password" value={formValues.password} onChange={handleChange} />
              </label>
              <label className="lab">
                Email Faculty
                <input className="inp" type="text" name="emailFaculty" value={formValues.emailFaculty} onChange={handleChange} />
              </label>
              <label className="lab">
                Email Personal 
                <input className="inp" type="text" name="emailPersonal" value={formValues.emailPersonal} onChange={handleChange} />
              </label>
              <label className="lab">
                Role
                <input className="inp" type="text" name="role" value={formValues.role} onChange={handleChange} />
              </label>
              <div className="but">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    
  );
};


export default CreateAccount;

