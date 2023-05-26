import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./NavBarAdmin/Nav";
import "./ChooseSubjects.css";
import WithAuth from "../../WithAuth";
import Swal from "sweetalert2";

interface User {
  code: string;
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
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
    localStorage.setItem("subjectToModify", userId.toString());
  };

  const handleDeleteUser = (userId: number) => {
    Swal.fire({
      title: "Are you sure you want to delete this subject?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The subject has been deleted.", "success");
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        const fetchUsers = async () => {
          try {
            const response = await fetch(
              `http://localhost:8192/courses/${userId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchUsers();
      }
    });
  };

  return (
    <div>
      <Nav />
      <div className="choose-table">
        <h3>Select the subject you want to modify or delete</h3>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.title} className="user-options">
              <p>
                {user.title} [{user.code}]
                <br />
              </p>
              <div className="buttons">
                <Link to="/ModifySubjectsOptions">
                  <button
                    className="modify-button"
                    onClick={() => handleModify(user.id)}
                  >
                    Modify subject
                  </button>
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

export default WithAuth(ChooseSubjects, [0]);
