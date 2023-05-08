import React, { useState } from "react";

interface FormValues {
    idCourse: number;
    idProfessor: number;
    title: string;
    markdownText: string;
    submitted: boolean;
}

const initialFormValues: FormValues = {
    idCourse: 0,
    idProfessor: 0,
    title: "",
    markdownText: "",
    submitted: false,
};



const MarkdownTest = () =>{
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues: FormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValues((prevFormValues: FormValues) => ({ ...prevFormValues, submitted: true }));

        const url = "http://localhost:8191/materials/create";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                console.log("Crearea materialului a fost realizata cu succes!");
                return response.text();
            })
            .then(text => {
                if (text) {
                    const parsedResponse = JSON.parse(text);
                } else {
                    // throw new Error("Empty response");
                }
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Id-ul cursului:
                    <input
                        type="number"
                        name="idCourse"
                        value={formValues.idCourse}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Id-ul profesorului:
                    <input
                        type="number"
                        name="idProfessor"
                        value={formValues.idProfessor}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Titlul materialului:
                    <input
                        type="area"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Markdown:
                    <textarea
                        name="markdownText"
                        value={formValues.markdownText}
                        onChange={handleChange}
                        required
                        rows={10}
                        cols={50}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default MarkdownTest;