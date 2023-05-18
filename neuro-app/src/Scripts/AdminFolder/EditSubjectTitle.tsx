import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";

interface FormValues {
    oldTitle: string;
    newTitle: string;
}
const initialFormValues: FormValues = {
    oldTitle: "",
    newTitle: "",
};

function EditSubjectTitle() {
    const [oldTitle, setOldTitle] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldTitle(event.target.value);
        setNewTitle(event.target.value);
    }
    return (
        <div>
            <Nav />
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="default-name">Current title:</label>
                    <br />
                    <input width="80" type="text" id="default-title" name="default-title" onChange={handleChange} />
                    <br /><br />
                    <label htmlFor="newTitle">New title:</label>
                    <br />
                    <input type="text" id="newTitle" name="newTitle" value={formValues.newTitle} onChange={handleChange} />
                    <br /><br />
                    <Link to='/ModifySubjectsOptions'>
                        <input type="submit" value="Edit title" />
                    </Link>

                </form>
            </div>
        </div>
    );
}

export default EditSubjectTitle;
