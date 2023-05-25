import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";

interface FormValues {
    oldBirthdate: string;
    newBirthdate: string;
}
const initialFormValues: FormValues = {
    oldBirthdate: "",
    newBirthdate: "",
};

const Body: React.FC<{}> = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [defaultValueObject, setDefaultValueObject] = useState<{ birthdate: string } | null>(null);


    useEffect(() => {
        var defaultValue = localStorage.getItem('studentDataModify');
        if (defaultValue !== null) {
            var parsedDefaultValue = JSON.parse(defaultValue);
            setDefaultValueObject(parsedDefaultValue);
        }
    }, []);

    useEffect(() => {
        if (inputRef.current && defaultValueObject) {
            
            inputRef.current.value = defaultValueObject.birthdate;
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
            parsedDefaultValue.birthDate = formValues.newBirthdate;
            localStorage.setItem('studentDataModify', JSON.stringify(parsedDefaultValue));
        }

        var idUs = localStorage.getItem('userToModify');
        const birthdateData = async () => {
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

        birthdateData();


    }

    return (
        <div>
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newBirthdate">New birthdate:</label>
                    <br />
                    <input  type="date" id="newBirthdate" name="newBirthdate" value={formValues.newBirthdate} onChange={handleChange} />
                    <br /><br />
                    <input type="submit" value="Edit birthdate" />
                </form>
            </div>
        </div>
    );
}


function EditStudentBirthdate() {
    return (
        <div>
            <Nav />
            <Body />
        </div>
    );
}

export default EditStudentBirthdate;
