import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";
import WithAuth from "../../WithAuth";


interface FormValues {
    oldYear: number;
    newYear: number;
}
const initialFormValues: FormValues = {
    oldYear: 0,
    newYear: 0,
};

const Body: React.FC<{}> = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [defaultValueObject, setDefaultValueObject] = useState<{ year: number } | null>(null);
    

    useEffect(() => {
        var defaultValue = localStorage.getItem('studentDataModify');
        if (defaultValue !== null) {
            var parsedDefaultValue = JSON.parse(defaultValue);
            setDefaultValueObject(parsedDefaultValue);
        }
    }, []);

    useEffect(() => {
        if (inputRef.current && defaultValueObject) {
            inputRef.current.value = defaultValueObject.year.toString();
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

        var defaultValue = localStorage.getItem('studentDataModify');
        if (defaultValue !== null) {
            var parsedDefaultValue = JSON.parse(defaultValue);
            parsedDefaultValue.year = formValues.newYear;
            localStorage.setItem('studentDataModify', JSON.stringify(parsedDefaultValue));
        }

        var idUs = localStorage.getItem('userToModify');
        const yearData = async () => {
            try {
                const response = await fetch(`http://localhost:8192/students/update/${idUs}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(parsedDefaultValue)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    window.location.href = "/ModifyOptionsPage"
                }

            } catch (error) {
                console.error(error);
            }
        };

        yearData();


    }

    return (
        <div>
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>

                    <label htmlFor="default-year">Current year:</label>
                    <br />
                    <input className="label-number" type="number" id="default-year" name="default-year" min="1" max="10" step="1" onChange={handleChange} ref={inputRef} readOnly />
                    <br /><br />
                    <label htmlFor="newYear">New year:</label>
                    <br />
                    <input className="label-number" type="number" id="newYear" name="newYear" min="1" max="6" step="1" value={formValues.newYear} onChange={handleChange} />
                    <br /><br />
                    <input type="submit" value="Edit year" />
                </form>
            </div>
        </div>
    );
}


function EditStudentYear() {
    return (
        <div>
            <Nav />
            <Body />
        </div>
    );
}

export default  WithAuth(EditStudentYear, [0]);
