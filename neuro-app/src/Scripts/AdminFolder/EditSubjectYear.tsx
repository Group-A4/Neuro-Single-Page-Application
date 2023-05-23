import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";

interface FormValues {
    oldYear: string;
    newYear: string;
}
const initialFormValues: FormValues = {
    oldYear: "",
    newYear: "",
};

function EditSubjectYear() {
    const [oldYear, setOldYear] = useState('');
    const [newYear, setNewYear] = useState('');
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldYear(event.target.value);
        setNewYear(event.target.value);
    }
    return (
        <div>
            <Nav />
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="default-name">Current year:</label>
                    <br />
                    <input className="label-number" type="number" id="default-year" name="default-year" min="1" max="6" step="1" onChange={handleChange} />
                    <br /><br />
                    <label htmlFor="newYear">New year:</label>
                    <br />
                    <input className="label-number" type="number" id="newYear" name="newYear"  min="1" max="6" step="1" value={formValues.newYear} onChange={handleChange} />
                    <br /><br />
                    <Link to='/ModifySubjectsOptions'>
                        <input type="submit" value="Edit year" />
                    </Link>

                </form>
            </div>
        </div>
    );
}

export default EditSubjectYear;
