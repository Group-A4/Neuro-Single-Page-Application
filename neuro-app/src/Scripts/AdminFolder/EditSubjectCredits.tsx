import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";

interface FormValues {
    oldCredits: string;
    newCredits: string;
}
const initialFormValues: FormValues = {
    oldCredits: "",
    newCredits: "",
};

function EditSubjectYear() {
    const [oldCredits, setOldCredits] = useState('');
    const [newCredits, setNewCredits] = useState('');
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldCredits(event.target.value);
        setNewCredits(event.target.value);
    }
    return (
        <div>
            <Nav />
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="default-name">Current number of credits:</label>
                    <br />
                    <input className="label-number" type="number" id="default-credits" name="default-credits" min="1" max="6" step="1" onChange={handleChange} />
                    <br /><br />
                    <label htmlFor="newYear">New number of credits:</label>
                    <br />
                    <input className="label-number" type="number" id="newCredits" name="newCredits"  min="1" max="6" step="1" value={formValues.newCredits} onChange={handleChange} />
                    <br /><br />
                    <Link to='/ModifySubjectsOptions'>
                        <input type="submit" value="Edit credits" />
                    </Link>

                </form>
            </div>
        </div>
    );
}

export default EditSubjectYear;
