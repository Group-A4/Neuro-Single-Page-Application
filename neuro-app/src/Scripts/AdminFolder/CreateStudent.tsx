import React, { useState } from "react";
import Nav from "./NavBarAdmin/Nav";
import "./CreateAccount.css";
import WithAuth from "../../WithAuth";
import Swal from "sweetalert2";

interface FormValues {
  firstName: string;
  lastName: string;
  password: string;
  emailFaculty: string;
  emailPersonal: string;
  role: string;
  code: string;
  year: number;
  semester: number;
  birthDate: string;
  submitted: boolean;
}

const initialFormValues: FormValues = {
  firstName: "",
  lastName: "",
  password: "",
  emailFaculty: "",
  emailPersonal: "",
  role: "1",
  code: "",
  year: 0,
  semester: 0,
  birthDate: "",
  submitted: false,
};

///500
///400 mail deja utilizat
const CreateStudent = () => {
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

    const url = "http://localhost:8192/students/create";

    fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formValues)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      Swal.fire({
        title: "Account created!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/SelectCreateAccount";
        }
      });
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
                Code
                <input className="inp" type="text" name="code" value={formValues.code} onChange={handleChange} />
              </label>
              <label className="lab">
                Year
                <input className="inp" type="number" min="1" max="6" step="1" name="year" value={formValues.year} onChange={handleChange} />
              </label>
              <label className="lab">
                Semester
                <input className="inp"  name="semester" value={formValues.semester}  type="number" min="1" max="2" step="1"onChange={handleChange} />
              </label>
              <label className="lab">
                Birth Date
                <input className="inp" type="date" name="birthDate" value={formValues.birthDate} onChange={handleChange} />
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


export default WithAuth(CreateStudent, [0]);

