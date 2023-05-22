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

const Body: React.FC<{}> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [defaultValueObject, setDefaultValueObject] = useState<{ emailPersonal: string } | null>(null);

  useEffect(() => {
    var defaultValue = localStorage.getItem('userDataModify');
    if (defaultValue !== null) {
      var parsedDefaultValue = JSON.parse(defaultValue);
      setDefaultValueObject(parsedDefaultValue);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current && defaultValueObject) {
      inputRef.current.value = defaultValueObject.emailPersonal;
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

    var defaultValue = localStorage.getItem('userDataModify');
    if (defaultValue !== null) {
      var parsedDefaultValue = JSON.parse(defaultValue);
      parsedDefaultValue.emailPersonal = formValues.newName;
      localStorage.setItem('userDataModify', JSON.stringify(parsedDefaultValue));
    }

      var idUs = localStorage.getItem('userToModify');
      const firstNameData = async () => {
        try {
          const response = await fetch(`http://localhost:8192/users/update/${idUs}`, {
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
          alert("Mail-ul este deja folosit!");
        }
      };
      
      firstNameData();    


  }
  return (
    <div>
      <div className="center-bubble">
      <form onSubmit={handleSubmit}>
    
        <label htmlFor="default-name">Current personal email:</label> 
        <br />
        <input width="80" type="text" id="default-name" name="default-name" onChange={handleChange} ref={inputRef}readOnly />
        <br /><br />
        <label htmlFor="newName">New personal email:</label> 
        <br />
        <input type="text" id="newName" name="newName" value={formValues.newName}  onChange={handleChange} />
        <br /><br />
        <input type="submit" value="Edit personal email" />
    
  
</form>
          </div>
    </div>
  );
}


function EditPersEmail() {
  return (
      <div>
          <Nav />
          <Body />
      </div>
  );
}

export default EditPersEmail;
