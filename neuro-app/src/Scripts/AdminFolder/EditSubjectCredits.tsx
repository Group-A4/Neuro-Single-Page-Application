import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";
import WithAuth from "../../WithAuth";

interface FormValues {
    oldCredits: string;
    newCredits: string;
}
const initialFormValues: FormValues = {
    oldCredits: "",
    newCredits: "",
};

function EditSubjectYear() {
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [defaultValueObject, setDefaultValueObject] = useState<{ credits: number } | null>(null);

    useEffect(() => {
        var defaultValue = localStorage.getItem('subjectDataModify');
        if (defaultValue !== null) {
        var parsedDefaultValue = JSON.parse(defaultValue);
        setDefaultValueObject(parsedDefaultValue);
        }
    }, []);

    useEffect(() => {
        if (inputRef.current && defaultValueObject) {
        inputRef.current.value = defaultValueObject.credits.toString();
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
          parsedDefaultValue.credits = formValues.newCredits;
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
                    <label htmlFor="default-credits">Current number of credits:</label>
                    <br />
                    <input className="label-number" type="number" id="default-credits" name="default-credits" min="1" max="6" step="1" onChange={handleChange} ref={inputRef}readOnly />
                    <br /><br />
                    <label htmlFor="newYear">New number of credits:</label>
                    <br />
                    <input className="label-number" type="number" id="newCredits" name="newCredits"  min="1" max="6" step="1" value={formValues.newCredits} onChange={handleChange} />
                    <br /><br />
                        <input type="submit" value="Edit credits" />
                </form>
            </div>
        </div>
    );
}

export default WithAuth(EditSubjectYear, [0]);
