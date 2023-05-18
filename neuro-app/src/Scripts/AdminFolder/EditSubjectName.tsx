import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";

interface FormValues {
    oldName: string;
    newName: string;
}
const initialFormValues: FormValues = {
    oldName: "",
    newName: "",
};

function EditSubjectName() {
    const [oldName, setOldName] = useState('');
    const [newName, setNewName] = useState('');
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldName(event.target.value);
        setNewName(event.target.value);
    }
    return (
        <div>
            <Nav />
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="default-name">Current name:</label>
                    <br />
                    <input width="80" type="text" id="default-name" name="default-name" onChange={handleChange} ref={inputRef} readOnly />
                    <br /><br />
                    <label htmlFor="newName">New name:</label>
                    <br />
                    <input type="text" id="newName" name="newName" value={formValues.newName} onChange={handleChange} />
                    <br /><br />
                    <Link to='/ModifySubjectsOptions'>
                        <input type="submit" value="Edit name" />
                    </Link>

                </form>
            </div>
        </div>
    );
}

export default EditSubjectName;
