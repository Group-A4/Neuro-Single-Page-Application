import React, { useState } from "react";
import Nav from "./NavBarAdmin/Nav";
import "./CreateSubject.css"

interface FormValues {
  name: string;
  submitted: boolean;
}

const initialFormValues: FormValues = {
  name: "",
  submitted: false,
};

///500
///400 mail deja utilizat
const CreateSubject = () => {
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
      <div className="create-subject-page">
        <div>
          <Nav />
        </div>
        <div className="body-text">
                Please insert the information for creating a subject
        </div>
        <div className="create-account-container">
          <div>
            <form onSubmit={handleSubmit} className="create-form">
              <label className="lab">
                Name
                <input className="inp" type="text" name="firstName" value={formValues.name} onChange={handleChange} />
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


export default CreateSubject;

