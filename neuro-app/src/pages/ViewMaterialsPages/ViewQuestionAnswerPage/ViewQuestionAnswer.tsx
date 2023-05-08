import React from 'react'
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
import Questions from './Questions';
import SelectSubjectTitle from '../../../components/SelectSubjectCompForTitle/SelectSubjectTitle';
import SelectCourse from '../../../components/SelectCourseComp/SelectCourse';


const Body: React.FC<{}> = () => {
    return (

        <>

            <div className={styles['body--text--container']}>
                <div className={styles['body--text']}>View Quiz questions: Course</div>
                
            </div>   

            
            <div className={styles['container']}>

             <Questions/>
            </div>

        </>
    )
}


const ViewQuestionAnswer: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <Body />
              
            </body>


        </>
    );
}

export default ViewQuestionAnswer;