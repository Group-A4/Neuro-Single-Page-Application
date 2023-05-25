import React, { useState } from "react";
import Nav from "./NavBarAdmin/Nav";
import "./CreateSubject.css";
import WithAuth from "../../WithAuth";

interface FormValues {
  title: string;
  year: number;
  semester: number;
  credits: number;
}

const initialFormValues: FormValues = {
  title: "",
  year: 1,
  semester: 1,
  credits: 1,
};

///500
///400 mail deja utilizat
function CreateSubject() {
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

    console.log(formValues);

    const url = "http://localhost:8192/courses/create";

        fetch(url, {
            method: "POST",
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }

            alert("The subject was added successfully!");
        })
        .catch(error => console.error(error));
  }



  return (
    <div className="create-subject-page">
      <div>
        <Nav />
      </div>
      <div className="body-text">
        Please insert the information for creating a subject
      </div>
      <div className="create-subject-container">
        <div>
          <form onSubmit={handleSubmit} className="create-form">
            <label className="lab" htmlFor="Title">
              Title</label>
              <input className="inp" type="text" name="title" id="Title" value={formValues.title} onChange={handleChange} required/>
            
            <label className="lab" htmlFor="Year">
              Year </label>
              <input className="inp" type="text" name="year" id="Year" value={formValues.year} onChange={handleChange} required/>
            
            <label className="lab" htmlFor="Semester">
              Semester  </label>
              <input className="inp" type="text" name="semester" id="Semester" value={formValues.semester} onChange={handleChange} required/>
           
            <label className="Credits">
              Credits </label>
              <input className="inp" type="text" name="credits" id="credits" value={formValues.credits} onChange={handleChange} required/>
            
            <div className="but">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>


  );
};


export default WithAuth(CreateSubject, [0]);

