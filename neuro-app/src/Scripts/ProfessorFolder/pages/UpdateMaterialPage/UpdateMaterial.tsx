import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import styles from '../CreateMaterialPage/CreateMaterial.module.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import {ContentList, useGetContents} from "../../components/contentList/ContentListByIdProf";
import MarkdownParser from "../../components/markdownToHtmlParser/MarkdownToHtmlParser";
import Nav from '../../components/nav/Nav';
import { renderToString } from 'react-dom/server';
import { SERVER_ADDRESS } from "../../../../config/config";
import {GetMaterialById} from "../../components/material/getMaterialById";
import { useLocation } from 'react-router-dom';
import withAuth from "../../../../WithAuth";

interface FormValues {
    idLecture: number;
    idProfessor: number;
    title: string;
    markdownText: string;
    html: string;
    submitted: boolean;
}

const initialFormValues: FormValues = {
    idLecture: 1,
    idProfessor: 53,
    title: "",
    markdownText: "",
    html: "",
    submitted: false,
};



const UpdateMaterial = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const materialId = queryParams.get('id');
    const material = GetMaterialById(Number(materialId));

    const filesName = useGetContents(53).map(content => content.name);

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const markdownParser = new MarkdownParser("neuroapi", "professor" + formValues.idProfessor, filesName);

    useEffect(() => {
        setFormValues((prevFormValues: FormValues) => ({
            ...prevFormValues,
            title: material.title,
            markdownText: material.markdownText,
            html: material.html,
        }));
      }, [material]);

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

        const url = SERVER_ADDRESS + `/materials/update/${materialId}`;

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                console.log("Actualizarea materialului a fost realizata cu succes!");
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
            <UpdateMaterial />
        </body>
    );
}



export default withAuth(Home, [1]);