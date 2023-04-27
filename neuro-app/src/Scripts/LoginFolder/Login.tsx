import React, { useState } from "react";
import NavBar from "../NavBarFolder/NavBar";
import AdminPage from "../AdminFolder/AdminPageRender";

function Login() {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Input value:', inputValue);
        // aici poți adăuga orice altă logică pentru a procesa valoarea introdusă
        if (inputValue === '1') {
          window.location.href = '/Admin';
        } else if (inputValue === '2') {
          window.location.href = '/pagina2';
        } else if (inputValue === '3') {
          window.location.href = '/pagina3';
        };
  }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Introdu o valoare:
            <input type="text" value={inputValue} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );

};

export default Login;
