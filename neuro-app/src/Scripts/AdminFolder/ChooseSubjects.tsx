import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from "./NavBarAdmin/Nav";
import "./ChooseSubjects.css";

function ChooseSubjects() {
  return (
    <div>
      <Nav />
      <div className="choose-table">
        <h3>Select the subject you want to modify or delete</h3>
        <div className="user-list">
          <div className="user-options">
            <p>Subject 1 </p>
            <div className="buttons">
            <Link to="/ModifySubjectsOptions">
                <button className="modify-button">
                  Modify subject
                </button></Link>
                <button className="delete-button">
                  Delete subject
                </button>
            </div>
          </div>
          <div className="user-options">
            <p>Subject 2 </p>
            <div className="buttons">
            <Link to="/ModifySubjectsOptions">
                <button className="modify-button">
                  Modify subject
                </button></Link>
                <button className="delete-button">
                  Delete subject
                </button>
            </div>
          </div>
          <div className="user-options">
            <p>Subject 3 </p>
            <div className="buttons">
            <Link to="/ModifySubjectsOptions">
                <button className="modify-button">
                  Modify subject
                </button></Link>
                <button className="delete-button">
                  Delete subject
                </button>
            </div>
          </div>
          <div className="user-options">
            <p>Subject 4 </p>
            <div className="buttons">
            <Link to="/ModifySubjectsOptions">
                <button className="modify-button">
                  Modify subject
                </button></Link>
                <button className="delete-button">
                  Delete subject
                </button>
            </div>
          </div>
          <div className="user-options">
            <p>Subject 5 </p>
            <div className="buttons">
            <Link to="/ModifySubjectsOptions">
                <button className="modify-button">
                  Modify subject
                </button></Link>
                <button className="delete-button">
                  Delete subject
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseSubjects;