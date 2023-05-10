import React, { useState } from "react";
import "./CSS/App.css";
import "./CSS/AdminPage.css";
import "./CSS/NavBar.css";
import Login from "./Scripts/LoginFolder/Login";
import ChooseAccountPage from "./Scripts/AdminFolder/ChooseAccount/ChooseAccountPage";
import Admin from "./Scripts/AdminFolder/HomePage/AdminHomePage";
import Student from "./Scripts/StudentFolder/HomePage/StudentHomePage";
import { Route, Routes } from "react-router-dom";
import Home from "./Scripts/ProfessorFolder/HomePage/Home";
import UploadMaterials from "./Scripts/ProfessorFolder/UploadMaterialsPage/UploadMaterials";
import ModifyOptionsPage from "./Scripts/AdminFolder/ModifyOptions/ModifyOptionsPage";
import EditFirstNamePage from "./Scripts/AdminFolder/EditFirstName/EditFirstNamePage";
import EditLastNamePage from "./Scripts/AdminFolder/EditLastName/EditLastNamePage";
import EditRolePage from "./Scripts/AdminFolder/EditRole/EditRolePage";
import EditPasswordPage from "./Scripts/AdminFolder/EditPassword/EditPasswordPage";
import EditUnivEmailPage from "./Scripts/AdminFolder/EditUnivEmail/EditUnivEmailPage";
import EditPersEmailPage from "./Scripts/AdminFolder/EditPersEmail/EditPersEmailPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="Admin" element={<Admin />}></Route>
      <Route path="Professor" element={<Home />}></Route>
      <Route path="ModifyOptionsPage" element={<ModifyOptionsPage />}></Route>
      <Route path="UploadMaterials" element={<UploadMaterials />} />
      <Route path="Student" element={<Student />}></Route>
      <Route path="ChooseAccountPage" element={<ChooseAccountPage />}></Route>
      <Route path="EditFirstNamePage" element={<EditFirstNamePage />}></Route>
      <Route path="EditLastNamePage" element={<EditLastNamePage />}></Route>
      <Route path="EditRolePage" element={<EditRolePage />}></Route>
      <Route path="EditPasswordPage" element={<EditPasswordPage />}></Route>
      <Route path="EditUnivEmailPage" element={<EditUnivEmailPage />}></Route>
      <Route path="EditPersEmailPage" element={<EditPersEmailPage />}></Route>
    </Routes>
  );
}

export default App;