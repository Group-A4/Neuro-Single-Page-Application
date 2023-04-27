import React, { useState } from "react";
import "./CSS/App.css";
import "./CSS/AdminPage.css";
import "./CSS/NavBar.css";
import Create from "./Scripts/AdminFolder/CreateAccount";
import Login from "./Scripts/LoginFolder/Login";
import Admin from "./Scripts/AdminFolder/AdminPageRender";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="Admin" element={<Admin />}></Route>
      <Route path="CreateAccount" element={<Create />}></Route>
    </Routes>
  );
}

export default App;
