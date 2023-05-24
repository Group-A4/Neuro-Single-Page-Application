import React, { useState } from "react";
import AdminPage from "../AdminFolder/AdminHomePage";
import Student from "../StudentFolder/HomePage/StudentHomePage";
import Log from "./LoginRender";
import withAuth from "../../WithAuth";

function Login() {

   

  return (<Log />);
     

};

export default withAuth(Login, [0, 1, 2]);
