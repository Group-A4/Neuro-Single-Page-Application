import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";
import WithAuth from "../../WithAuth";

interface FormValues {
    oldTitle: string;
    newTitle: string;
}
const initialFormValues: FormValues = {
    oldTitle: "",
    newTitle: "",
};

function EditSubjectTitle() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [defaultValueObject, setDefaultValueObject] = useState<{ title: string } | null>(null);

    useEffect(() => {
        var defaultValue = localStorage.getItem('subjectDataModify');
        if (defaultValue !== null) {
        var parsedDefaultValue = JSON.parse(defaultValue);
        setDefaultValueObject(parsedDefaultValue);
        }
    }, []);

    useEffect(() => {
        if (inputRef.current && defaultValueObject) {
        inputRef.current.value = defaultValueObject.title;
        }
    }, [defaultValueObject]);

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
    
        var defaultValue = localStorage.getItem('subjectDataModify');
        if (defaultValue !== null) {
          var parsedDefaultValue = JSON.parse(defaultValue);
          parsedDefaultValue.title = formValues.newTitle;
          localStorage.setItem('subjectDataModify', JSON.stringify(parsedDefaultValue));
        }
    
          var idUs = localStorage.getItem('subjectToModify');
          const subjectNameTitle = async () => {
            try {
              const response = await fetch(`http://localhost:8192/courses/update/${idUs}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
                body : JSON.stringify(parsedDefaultValue)
              });
          
              if (!response.ok) {
                throw new Error('Network response was not ok');
              } else {
                window.location.href = "/ModifySubjectsOptions"
              }
          
            } catch (error) {
              console.error(error);
            }
          };
          
          subjectNameTitle();    
        
      }
    

    return (
        <div>
            <Nav />
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="default-title">Current title:</label>
                    <br />
                    <input width="80" type="text" id="default-title" name="default-title" onChange={handleChange} ref={inputRef}readOnly />
                    <br /><br />
                    <label htmlFor="newTitle">New title:</label>
                    <br />
                    <input type="text" id="newTitle" name="newTitle" value={formValues.newTitle} onChange={handleChange} />
                    <br /><br />
                    <input type="submit" value="Edit title" />

                </form>
            </div>
        </div>
    );
}

export default WithAuth(EditSubjectTitle, [0]);
