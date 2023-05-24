import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import styles from './contentListPage.module.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import {ContentList, useGetContents} from "../../components/contentList/ContentListPage";
import MarkdownParser from "../../components/markdownToHtmlParser/MarkdownToHtmlParser";
import Nav from '../../components/nav/Nav';
import { renderToString } from 'react-dom/server';
import { SERVER_ADDRESS } from "../../../../config/config";
import {GetMaterialById} from "../../components/material/getMaterialById";
import { useLocation } from 'react-router-dom';
import withAuth from "../../../../WithAuth";



const ViewContentList = () =>{    
    const user = JSON.parse(localStorage.getItem('utilizator') || '{}');
    return (
        <>
            <ContentList professorId={user.id} />
        </>
    )
}

function Home() {
    return (
        <body>
            <ViewContentList />
        </body>
    );
}



export default withAuth(Home, [1]);