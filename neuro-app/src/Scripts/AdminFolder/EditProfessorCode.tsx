import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './NavBarAdmin/Nav';
import "./AdminPage.css";
import WithAuth from "../../WithAuth";

interface FormValues {
  oldCode: string;
  newCode: string;
}
const initialFormValues: FormValues = {
  oldCode: "",
  newCode: "",
};


const Body: React.FC<{}> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [defaultValueObject, setDefaultValueObject] = useState<{ code: string } | null>(null);


  useEffect(() => {
    var defaultValue = localStorage.getItem('profDataModify');
    if (defaultValue !== null) {
      var parsedDefaultValue = JSON.parse(defaultValue);
      setDefaultValueObject(parsedDefaultValue);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current && defaultValueObject) {
      inputRef.current.value = defaultValueObject.code;
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
      parsedDefaultValue.code = formValues.newCode;
      localStorage.setItem('profDataModify', JSON.stringify(parsedDefaultValue));
    }

      var idUs = localStorage.getItem('userToModify');
      const codeData = async () => {
        try {
          const response = await fetch(`http://localhost:8192/professors/update/${idUs}`, {
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
            window.location.href = "/ModifyOptionsPage"
          }
      
        } catch (error) {
          console.error(error);
        }
      };
      
      codeData();    

  }

  return (
    <div>
      <Nav />
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
    
            <label htmlFor="default-code">Current code:</label> 
            <br />
            <input width="80" type="text" id="default-code" name="default-code" onChange={handleChange} ref={inputRef}readOnly />
            <br /><br />
            <label htmlFor="newName">New code:</label> 
            <br />
            <input type="text" id="newCode" name="newCode" value={formValues.newCode}  onChange={handleChange} />
            <br /><br />
            <input type="submit" value="Edit code" />
        </form>
      </div>
    </div>
  );
}

export default WithAuth(Body, [0]);
