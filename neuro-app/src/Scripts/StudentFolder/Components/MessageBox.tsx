import React from 'react'
import '../ResultMockExamPage/MockExamResultPage.css';

const Message:React.FC<{}> = () => {
    return(
        <div className="message"> 
            <p>You are able to see your answers to this mock exam only now. After leaving this page you will no longer have access to the history of your answers to this test!</p>
        </div>
    )
}
export default Message;