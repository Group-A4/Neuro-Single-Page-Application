import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from "./NavBarAdmin/Nav";
import "./ChooseSubjects.css";
import WithAuth from "../../WithAuth";

interface User {
  id: number;
  title: string;
  year: number;
  semester: number;
}


function ChooseSubjects() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8192/courses", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*'
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleModify = (userId: number) => {
    
    localStorage.setItem('subjectToModify', userId.toString());

  }

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    
      const fetchUsers = async () => {
        try {
          const response = await fetch(`http://localhost:8192/courses/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*'
            }
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
        } catch (error) {
          console.error(error);
        }
      };
      fetchUsers();


  };

  return (
    <div>
      <Nav />
      <div className="choose-table">
        <h3>Select the subject you want to modify or delete</h3>
        <div className="user-list">
          {users.map((user) => (
              <div key={user.title} className="user-options">
                <p>{user.title} {user.year} {user.semester}</p>
                <div className="buttons">
                  <Link to="/ModifySubjectsOptions">
                    <button className="modify-button"
                    onClick={() => handleModify(user.id)}
                    >Modify subject</button>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete subject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WithAuth(ChooseSubjects,[0]);