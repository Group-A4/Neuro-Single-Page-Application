import React, { useState } from "react";

interface FormValues {
    id: string;
}
const initialFormValues: FormValues = {
    id: "",
  };


///404 nu exista
///403 nu se sterge ultimul admin
///200 e ok
function DeleteAccount (){
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
      
        const idToDelete = formValues;
        console.log(formValues);
        fetch(`http://localhost:8192/users/${idToDelete.id}`, {
          method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            console.log("Stergerea contului a fost cu succes!");
            return response.text();
          })
          .then(text => {
            if (text) {
              return JSON.parse(text);
            } else {
              throw new Error("Empty response");
            }
          })
          .then(data => console.log(data))
          .catch(error => console.error(error));
      };
      

    return (
        <div className="delete-account-container">
        <div>
            <form onSubmit={handleSubmit} className="create-form">
            <label>
                Please enter the id of the user you wish to delete: <br />
                <input type="text" name="id" value={formValues.id} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    )   
}

export default DeleteAccount;