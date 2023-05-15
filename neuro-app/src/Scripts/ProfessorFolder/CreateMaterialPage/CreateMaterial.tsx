import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import styles from './CreateMaterial.module.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import {ContentList, useGetContents} from "../../../components/contentList/listContentsByIdProf";
import MarkdownParser from "./MarkdownToHtmlParser";
import Nav from '../NavBarProfessor/Nav';
import { renderToString } from 'react-dom/server';
import { SERVER_ADDRESS } from "../../../config/config";

interface FormValues {
    idLecture: number;
    idProfessor: number;
    title: string;
    markdownText: string;
    html: string;
    submitted: boolean;
}

const initialFormValues: FormValues = {
    idLecture: 2,
    idProfessor: 53,
    title: "",
    markdownText: "",
    html: "",
    submitted: false,
};




const Markdown = () =>{
    const filesName = useGetContents(53).map(content => content.name);

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const markdownParser = new MarkdownParser("neuroapi", "professor" + formValues.idProfessor, filesName);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues: FormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));

        if (name === "markdownText") {
            const htmlString = renderToString(
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {markdownParser.parse(value)}
                </ReactMarkdown>
              );

            setFormValues((prevFormValues: FormValues) => ({
                ...prevFormValues,
                html: htmlString,
            }));
        }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValues((prevFormValues: FormValues) => ({ ...prevFormValues, submitted: true }));

        const url = SERVER_ADDRESS + "/materials/create";

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
        <>
            <div className={styles['body']}>
                <ContentList professorId={53} />
                <form className={styles['markdown-form']} onSubmit={handleSubmit}>
                    <label className={styles['title-lable']}>
                        <p className={styles.p}>Titlul materialului:</p>
                        <input
                            className={styles['title-input']}
                            type="area"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles['markdown-label']}>
                        <p className={styles.p}>Markdown:</p>
                        <textarea
                            className={styles['markdown-textarea']}
                            name="markdownText"
                            value={formValues.markdownText}
                            onChange={handleChange}
                            required
                            // rows={20}
                            // cols={50}
                        />
                    </label>
                    <button className={styles['button-27']}role="button">Publish</button>
                </form>
                <label className={styles['preview-label']}>
                    <div className={styles['display-html-area']}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {markdownParser.parse(formValues.markdownText)}
                    </ReactMarkdown>
                    </div>
                    <span className={styles.dot}></span>
                </label>
            </div>
        </>
    )
}

function Home() {
    return (
        <body>
            <Nav />
            <Markdown />
        </body>
    );
}



export default Home;