import "./Login.css"

function LoginRender(){
    
    
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
                        <div className="input-box">
                            <header>Sign In</header>
                            <div className="input-field1">
                                <input type="text" className="input" id="email" required autoComplete="off"/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field2">
                                <input type="password" className="input" id="password" required/>
                                <label htmlFor="email">Password</label>
                            </div>
                            <div className="input-field">
                                <input type="submit" className="submit" value="Sign In"/>
                            </div>
                            <div className="forgot-password">
                                <span>Forgot your password?<a href=""> Click here for recover</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginRender;