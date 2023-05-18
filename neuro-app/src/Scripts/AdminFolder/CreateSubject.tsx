import React, { useState } from "react";
import Nav from "./NavBarAdmin/Nav";
import "./CreateSubject.css"

interface FormValues {
  title: string;
  year: number;
  semester: number;
  credits: number;
  submitted: boolean;
}

const initialFormValues: FormValues = {
  title: "",
  year: 1,
  semester: 1,
  credits: 1,
  submitted: false,
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
            <label className="lab">
              Title
              <input className="inp" type="text" name="title"  value={formValues.title} onChange={handleChange} required/>
            </label>
            <label className="lab">
              Year
              <input className="inp" type="number" name="year" min="1" max="6" step="1" value={formValues.year} onChange={handleChange} required/>
            </label>
            <label className="lab">
              Semester
              <input className="inp" type="number" name="semester" min="1" max="2" step="1" value={formValues.semester} onChange={handleChange} required/>
            </label>
            <label className="lab">
              Credits
              <input className="inp" type="number" name="credits" min="1" max="6" step="1" value={formValues.credits} onChange={handleChange} required/>
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

