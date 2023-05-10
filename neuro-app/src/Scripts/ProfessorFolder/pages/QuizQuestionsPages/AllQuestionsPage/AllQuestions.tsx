import React from 'react'
import Nav from '../../../components/nav/Nav';
import styles from './Body.module.css';
import Questions from './Questions';
import SelectSubject from '../../../components/SelectSubjectComp/SelectSubject';
import SelectCourse from '../../../components/SelectCourseComp/SelectCourse';
import ButtonAddQuestion from '../../../components/buttonAddQuestion/ButtonAddQuestion';
import { Link } from 'react-router-dom';


const Body: React.FC<{}> = () => {
    return (

        <>
            <div className={styles['body--text']}>
                <div className={styles['body--title']}>
                    Quiz questions
                </div>
                <div className={styles['body--button']}>
                    <Link to='/AddQuestion'>
                        <ButtonAddQuestion />
                    </Link>
                </div>
            </div>   

            <div className={styles['body--subtitle--container']}>

                <div className={styles['selects']}>
                    <SelectSubject />
                </div>

                <div className={styles['selects']}>
                    <SelectCourse />
                </div>
                    

              

            </div> 

            <div className={styles['body--line']}></div>  
            
            <div className={styles['container']}>
             <Questions/>
            </div>

        </>
    )
}


const AllQuestions: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}> 
                <Nav />
                <Body />
              
            </body>


        </>
    );
}

export default AllQuestions;