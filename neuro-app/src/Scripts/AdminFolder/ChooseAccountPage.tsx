import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./NavBarAdmin/Nav";
import "./ChooseAccount.css";
import WithAuth from "../../WithAuth";
import Swal from "sweetalert2";

interface User {
  id: number;
  lastName: string;
  firstName: string;
}

const Bod: React.FC<{}> = () => {
  return (
    <div className="choose-table">
      <h3>Select the account you want to modify or delete</h3>
      <div className="user-list"></div>
    </div>
  );
};

function ChooseAccount() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8192/users", {
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
    localStorage.setItem("userToModify", userId.toString());
  };

  const handleDeleteUser = (userId: number) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire("Deleted!", "The user has been deleted.", "success");
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);

        const fetchUsers = async () => {
          try {
            const response = await fetch(
              `http://localhost:8192/users/${userId}`,
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
        <h3>Select the account you want to modify or delete</h3>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-options">
              <p>
                {user.lastName} {user.firstName}
              </p>
              <div className="buttons">
                <Link to="/ModifyOptionsPage">
                  <button
                    className="modify-button"
                    onClick={() => handleModify(user.id)}
                  >
                    Modify account
                  </button>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete account
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WithAuth(ChooseAccount, [0]);
