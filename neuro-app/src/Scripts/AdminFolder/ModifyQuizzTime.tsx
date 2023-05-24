import React, { useState, useEffect, useRef } from "react";
import Nav from "./NavBarAdmin/Nav";
import "./AdminPage.css";
import WithAuth from "../../WithAuth";

interface FormValues {
  quizTime: string;
}

const initialFormValues: FormValues = {
  quizTime: "",
};

const Body: React.FC<{}> = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { quizTime } = formValues;
    const timeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8192/general-info/update/1`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
          }
        );
        const data = await response;
        if (data.status === 204) {
          alert("Time for quiz has been updated!");
          window.location.href = "/Admin";
        }
      } catch (error) {
        console.error(error);
      }
    };

    timeData();
  };

  return (
    <div>
      <Nav />
      <div className="center-bubble">
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-time">Enter new time for quiz:</label>
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
          <input type="submit" value="Enter time for quiz" />
        </form>
      </div>
    </div>
  );
};

export default WithAuth(Body, [0]);
