import React, { useState } from "react";
import "./Login.css"
import { useToast } from "react-toastify";

interface FormValues {
    emailFaculty: string;
    password: string;
}

const initialFormValues: FormValues = {
    emailFaculty: "",
    password: "",
};

function LoginRender(){
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [backToLogin, setBackToLogin] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    var logged = 0;

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

        const url = "http://localhost:8192/api/v1/auth/authenticate";

        fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            console.log("Logarea a avut loc cu succes !");
            logged = 1;
            return response.text();
        })
        .then(text => {
            if (text.trim().length > 0) {
            return JSON.parse(text);
            } else {
            return {};
            }
        })
        .then(data => localStorage.setItem('token', data.token))
        .catch(error => console.error(error));
        
        fetch(`http://localhost:8192/users/mail/${formValues.emailFaculty}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(data => console.log(JSON.stringify(data)))

        
        
    }


    const handleForgotPasswordClick = () =>{
        setShowForgotPassword(true);
        setBackToLogin(false);
    }
    
    const handeBackToLogin = () =>{
        setShowForgotPassword(false);
        setBackToLogin(true);
    }


    return(
        <div className="wrapper">
            <div className="container-main">
                <div className="row">

                    <div className="left">
                        <div className="text">
                            <p>Welcome to Neurosurgical App</p>
                            <span>A platform that  provides you a smart
                                learning environment with support for 
                                courses, quizzes and testing.</span>
                        </div>
                    </div>  

                    <div className="right">
                        <img src="images/logo1.png" alt="logo" />
                        {showForgotPassword ? (
                            <div className="input-box login-form slide-in">
                                <div className="input-box">
                                <header>Recover your password</header>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-field1">
                                            <input type="email" className="input" id="email" name="emailFaculty" value={formValues.emailFaculty} onChange={handleChange} required autoComplete="off"/>
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="submit" className="submit" value="Recover"/>
                                        </div>
                                    </form>
                                    <div className="forgot-password">
                                        <a onClick={handeBackToLogin}>Back to login</a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="input-box recovery-form slide-out">
                                <div className="input-box">
                                <header>Sign In</header>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-field1">
                                            <input type="email" className="input" id="email" name="emailFaculty" value={formValues.emailFaculty} onChange={handleChange} required autoComplete="off"/>
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field2">
                                            <input type="password" className="input" id="password" name="password" value={formValues.password} onChange={handleChange} required/>
                                            <label htmlFor="email">Password</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="submit" className="submit" value="Sign In"/>
                                        </div>
                                    </form>
                                    <div className="forgot-password">
                                        <span>Forgot your password?<a onClick={handleForgotPasswordClick}> Click here for recover</a></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginRender;