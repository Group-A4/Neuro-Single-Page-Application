import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";

interface FormValues {
    oldSemester: string;
    newSemester: string;
}
const initialFormValues: FormValues = {
    oldSemester: "",
    newSemester: "",
};

function EditSubjectYear() {
    const [oldSemester, setOldSemester] = useState('');
    const [newSemester, setNewSemester] = useState('');
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldSemester(event.target.value);
        setNewSemester(event.target.value);
    }
    return (
        <div>
            <Nav />
            <div className="center-bubble">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="default-name">Current semester:</label>
                    <br />
                    <input className="label-number" type="number" id="default-semester" name="default-semester" min="1" max="2" step="1" onChange={handleChange} />
                    <br /><br />
                    <label htmlFor="newYear">New semester:</label>
                    <br />
                    <input className="label-number" type="number" id="newSemester" name="newSemester"  min="1" max="2" step="1" value={formValues.newSemester} onChange={handleChange} />
                    <br /><br />
                    <Link to='/ModifySubjectsOptions'>
                        <input type="submit" value="Edit semester" />
                    </Link>

                </form>
            </div>
        </div>
    );
}

export default EditSubjectYear;
