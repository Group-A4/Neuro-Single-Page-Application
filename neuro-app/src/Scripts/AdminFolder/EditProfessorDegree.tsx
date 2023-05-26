import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";

interface FormValues {
    oldDegree: string;
    newDegree: string;
}
const initialFormValues: FormValues = {
    oldDegree: "",
    newDegree: "",
};

const Body: React.FC<{}> = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [defaultValueObject, setDefaultValueObject] = useState<{ degree: string } | null>(null);


    useEffect(() => {
        var defaultValue = localStorage.getItem('profDataModify');
        if (defaultValue !== null) {
            var parsedDefaultValue = JSON.parse(defaultValue);
            setDefaultValueObject(parsedDefaultValue);
        }
    }, []);

    useEffect(() => {
        if (inputRef.current && defaultValueObject) {
            inputRef.current.value = defaultValueObject.degree.toString();
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

        var defaultValue = localStorage.getItem('profDataModify');
        if (defaultValue !== null) {
            var parsedDefaultValue = JSON.parse(defaultValue);
            parsedDefaultValue.degree = formValues.newDegree;
            localStorage.setItem('profDataModify', JSON.stringify(parsedDefaultValue));
        }

        var idUs = localStorage.getItem('userToModify');
        const degreeData = async () => {
            try {
                const response = await fetch(`http://localhost:8192/professors/update/${idUs}`, {
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

        degreeData();


    }

    return  (
        <div>
          <Nav />
          <div className="center-bubble">
            <form onSubmit={handleSubmit}>
                <label htmlFor="default-degree">Current degree:</label> 
                <br />
                <input width="80" type="text" id="default-degree" name="default-degree" onChange={handleChange} ref={inputRef}readOnly />
                <br /><br />
                <label htmlFor="newName">New degree:</label> 
                <br />
                <input type="text" id="newDegree" name="newDegree" value={formValues.newDegree}  onChange={handleChange} />
                <br /><br />
                <input type="submit" value="Edit degree" />
            </form>
          </div>
        </div>
      );
}


function EditProfessorDegree() {
    return (
        <div>
            <Body />
        </div>
    );
}

export default EditProfessorDegree;
