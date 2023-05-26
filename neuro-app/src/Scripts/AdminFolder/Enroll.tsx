import React, { useState, useEffect, useRef } from "react";
import NavAdmin from "./NavBarAdmin/Nav";
import NavStudent from "../StudentFolder/NavBarStudent/Nav";
import NavProf from "../ProfessorFolder/components/nav/Nav";
import "./AdminPage.css";
import WithAuth from "../../WithAuth";
import Swall from "sweetalert2";
import { wait } from "@testing-library/user-event/dist/utils";

interface FormValues {
  quizTime: string;
}

const initialFormValues: FormValues = {
  quizTime: "",
};

const Body: React.FC<{}> = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [role, setRole] = useState<number | undefined>(undefined); // Store the role in state

  useEffect(() => {
    const utilizatorJson = localStorage.getItem("utilizator");
    if (utilizatorJson !== null) {
      const utilizator = JSON.parse(utilizatorJson);
      setRole(utilizator.role);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { quizTime } = formValues;

    let id = 0;
    const user = localStorage.getItem("utilizator");
    if (user !== null) {
      const utilizator = JSON.parse(user);
      id = utilizator.id;
    }

    if (role === 1 /* PROFFESOR */) {
      // Professor logic
      try {
        const response = await fetch(
          `http://localhost:8192/didactic/create/course=${quizTime}/professor=${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            }
          }
        );
        if (response.status === 201) {
          Swall.fire({
            title: "Successfully enrolled!",
            text: "You can now make modifications to your course!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            }
          });
        } else {
          Swall.fire({
            title: "Error!",
            text: "You are already enrolled in this course!",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else if (role === 2 /* STUDENT */) {
      // Student logic
      try {
        const response = await fetch(
          `http://localhost:8192/studentFollowsCourses/create/course=${quizTime}/student=${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            }
          }
        );
        if (response.status === 201) {
          Swall.fire({
            title: "Successfully enrolled!",
            text: "You can now can look at your courses!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            }
          });
        } else {
          Swall.fire({
            title: "Error!",
            text: "You are already enrolled in this course!",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Other role logic
      Swall.fire({
        title: "Error!",
        text: "You are not a student or a professor!",
        icon: "error",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <div>
      {role === 0 && <NavAdmin />}
      {role === 2 && <NavStudent />}
      {role === 1 && <NavProf />}
      <br />
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-time">Enter the code to enroll:</label>
          <br />
          <input
            style={{ width: "80px" }}
            type="text"
            id="new-time"
            name="quizTime"
            value={formValues.quizTime}
            onChange={handleChange}
          />
          <br />
          <br />
          <input type="submit" value="Enter the code" />
        </form>
      </div>
    </div>
  );
};

export default WithAuth(Body, [0, 1, 2]);
