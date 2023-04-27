import React, { useState } from "react";

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
      if (text) {
        return JSON.parse(text);
      } else {
        throw new Error("Empty response");
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
    
};


  return (
     
    <div className="create-account-container">
      <div>
        <form onSubmit={handleSubmit} className="create-form">
          <label>
            First Name: <br />
            <input type="text" name="firstName" value={formValues.firstName} onChange={handleChange} />
          </label>
          <label>
            Last Name: <br />
            <input type="text" name="lastName" value={formValues.lastName} onChange={handleChange} />
          </label>
          <label>
            Password: <br />
            <input type="password" name="password" value={formValues.password} onChange={handleChange} />
          </label>
          <label>
            Email Faculty: <br />
            <input type="text" name="emailFaculty" value={formValues.emailFaculty} onChange={handleChange} />
          </label>
          <label>
            Email Personal: <br />
            <input type="text" name="emailPersonal" value={formValues.emailPersonal} onChange={handleChange} />
          </label>
          <label>
            Role: <br />
            <input type="text" name="role" value={formValues.role} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    
  );
};


export default CreateAccount;

