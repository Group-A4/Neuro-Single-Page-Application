import React, { useState } from "react";
import "./Login.css";



interface FormValues {
    emailFaculty: string;
    password: string;
}

interface RecoveryEmail{
    emailFaculty: string;
}

interface ForCode{
    code: string
}

interface ForUpdate{
    newPassword: string;
}

const initialEmail: RecoveryEmail = {
    emailFaculty: ""
};

const initialFormValues: FormValues = {
    emailFaculty: "",
    password: "",
};

const initialCode: ForCode = {
    code: ""
};

const initialUpdate: ForUpdate = {
    newPassword: ""
}


function LoginRender(){
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showCodeForEmail, setShowCodeForEmail] = useState(false);
    const [showSwitchPassword, setSwitchPassword] = useState(false);
    const [backToLogin, setBackToLogin] = useState(false);

    ///Formul de logare
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    
    ///Formul de Recovery
    const [recoveryValues, setRecoveryValues] = useState<RecoveryEmail>(initialEmail);

    ///Formul de code
    const[recoverCode, setRecoverCode] = useState<ForCode>(initialCode);

    ///Formul pentru update
    const[updateValues, setUpdateValues] = useState<ForUpdate>(initialUpdate);

    const checkIfTokenExists = () => {
        if (localStorage.getItem('token') !== null) {
            // check in the database if the user is ok

            const getEmailData = async () => {
                fetch(`http://localhost:8192/users/mail/${formValues.emailFaculty}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                
                    return response.json();
                }
                )
                .then(data => localStorage.setItem('utilizator', JSON.stringify(data)))
                .catch(error => console.error(error));
            };

            // redirect to the page where the user should be
            getEmailData();

            const utilizator = localStorage.getItem('utilizator');
            if (utilizator !== null) {
                const parsedUtilizator = JSON.parse(utilizator);
                if (parsedUtilizator.role == 0) {
                    window.location.href = "/Admin";
                } else if (parsedUtilizator.role == 1) {
                    window.location.href = "/Professor";
                } else if (parsedUtilizator.role == 2) {
                    window.location.href = "/Student";
                }
            }
        }
    }

    checkIfTokenExists();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues: FormValues) => ({
          ...prevFormValues,
          [name]: value,
        }));
      };

      const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRecoveryValues((prevFormValues: RecoveryEmail) => ({
          ...prevFormValues,
          [name]: value,
        }));
      };

      const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRecoverCode((prevFormValues: ForCode) => ({
          ...prevFormValues,
          [name]: value,
        }));
      };

      const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdateValues((prevFormValues: ForUpdate) => ({
          ...prevFormValues,
          [name]: value,
        }));
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValues((prevFormValues: FormValues) => ({ ...prevFormValues, submitted: true }));

        const url = "http://localhost:8192/api/v1/auth/authenticate";

        //// FETCH PENTRU LOGARE
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
        

        const getEmailData = async () => {
            try {
              const response = await fetch(`http://localhost:8192/users/mail/${formValues.emailFaculty}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  'Access-Control-Allow-Origin': '*'
                }
              });
          
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const data = await response.json();
              localStorage.setItem('utilizator', JSON.stringify(data));
              
            if(data.role == 0)
                window.location.href = "/Admin";
            else if(data.role == 1)
                window.location.href = "/Professor";
            else if(data.role == 2)
                window.location.href = "/Student";
            

            } catch (error) {
              console.error(error);
            }
          };
          
          getEmailData();      
    }

    ///FETCH PENTRU RECOVER
    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        setRecoveryValues((prevRecoveryValues: RecoveryEmail) => ({ ...prevRecoveryValues, submitted: true }));

        const url = "http://localhost:8192/api/v1/recovery/credentials";

        fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/text"
            },
            body: recoveryValues.emailFaculty
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            
            setShowCodeForEmail(true);
            localStorage.setItem('emailRecover', recoveryValues.emailFaculty);
            return response.text();
        })
        .then(text => {
            localStorage.setItem('codeRecover', text)
            console.log(text)
        })
        .catch(error => console.error(error));
    }

    ///FETCH PENTRU CODE
    const handleSubmit3 = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        setRecoverCode((prevRecoveryValues: ForCode) => ({ ...prevRecoveryValues, submitted: true }));

        const email = localStorage.getItem("emailRecover");
        const codR = localStorage.getItem("codeRecover");
        const url = `http://localhost:8192/api/v1/recovery/validate_code/${email}/${codR}`;

        fetch(url, {
            method: "GET"
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
        
            setSwitchPassword(true);

            return response.text();
        })
        .then(text => {
            console.log(text)
        })
        .catch(error => console.error(error));
    }

    const handleSubmit4 = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        setUpdateValues((prevRecoveryValues: ForUpdate) => ({ ...prevRecoveryValues, submitted: true }));

        const emaill = localStorage.getItem("emailRecover");
        const codR = localStorage.getItem("codeRecover");
        const url = "http://localhost:8192/api/v1/recovery/reset";
        
        let ob = {
            email : emaill,
            secretCode: codR,
            newPassword: updateValues.newPassword
        };
        

        fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }

            return response.text();
        })
        .then(text => {
            window.location.href = "/";
            console.log(text)
        })
        .catch(error => console.error(error));
    }




    ///UTILE PENTRU TRANZITIA DE LA LOGIN LA RECOVER
    const handleForgotPasswordClick = () =>{
        setShowForgotPassword(true);
        setBackToLogin(false);
    }
    
    const handeBackToLogin = () =>{
        setShowForgotPassword(false);
        setBackToLogin(true);
    }

    ///showSwitchPassword
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
                        {showForgotPassword ? (showCodeForEmail ? (showSwitchPassword ? (

                        <div className="input-box login-form slide-in">
                            <div className="input-box">
                            <header>Update Password</header>
                                <form onSubmit={handleSubmit4}>
                                    <div className="input-field1">
                                        <input type="password" className="input" id="Passsword" name="newPassword" value={updateValues.newPassword} onChange={handleChange4} required autoComplete="off"/>
                                        <label htmlFor="Passsword">New-Password</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="submit" className="submit" value="Update-Password"/>
                                    </div>
                                </form>
                                <div className="forgot-password">
                                        <a onClick={handeBackToLogin}>Back to login</a>
                                </div>
                            </div>
                        </div>

                        ) : 
                        (
                            <div className="input-box login-form slide-in">
                                <div className="input-box">
                                    <header>Send Code</header>
                                    <form onSubmit={handleSubmit3}>
                                        <div className="input-field1">
                                            <input type="text" className="input" id="codd" name="code" value={recoverCode.code} onChange={handleChange3} required/>
                                            <label htmlFor="codd">Code</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="submit" className="submit" value="Send-Code"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )) : (
                            <div className="input-box login-form slide-in">
                                <div className="input-box">
                                <header>Recover your password</header>
                                    <form onSubmit={handleSubmit2}>
                                        <div className="input-field1">
                                            <input type="text" className="input" id="email" name="emailFaculty" value={recoveryValues.emailFaculty} onChange={handleChange2} required autoComplete="off"/>
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
                        )
                        ) : (
                            <div className="input-box recovery-form slide-out">
                                <div className="input-box">
                                <header>Sign In</header>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-field1">
                                            <input type="text" className="input" id="email" name="emailFaculty" value={formValues.emailFaculty} onChange={handleChange} required autoComplete="off"/>
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