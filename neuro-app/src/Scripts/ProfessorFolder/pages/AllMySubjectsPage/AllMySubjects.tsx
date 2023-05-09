import React from 'react'
import Nav from '../../components/nav/Nav';
import styles from './Body.module.css'
import { Link } from 'react-router-dom';
import SelectSubject from '../../components/SelectSubjectComp/SelectSubject';
import photo_option from './option.png';
import Scroll from '../../components/ScrollComp/Scroll';
import ButtonAddCourse from '../../components/buttonAddCourse/ButtonAddCourse';
import { useState } from "react";



const Body: React.FC<{}> = () => {


    return (

        <>

            <div className={styles['body--text']}>
                All my subjects
            </div>        

            <div>
                <div className={styles['body--subtitle--container']}>

                    <SelectSubject />
    
                </div>   
                
                <div className={styles['body--line']}></div>  
                {/* INCEP */}
                <div className={styles['body--container']}> 

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course 1
                        </div> 
                        <div className={styles['body--img'] }>
                            <Scroll/>
                        </div>
                    </div>   

                     <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course 2
                        </div>
                        <div className={styles['body--img']}>
                            
                            <Scroll />
                            
                        </div>
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course 3
                        </div>
                        <div className={styles['body--img']}>
                           
                            <Scroll />
                           
                        </div>
                    </div>  

                    <div className={styles['course-container']}>
                        <div className={styles['course-title']}>
                            Course 4
                        </div>
                        <div className={styles['body--img']}>
                            
                            <Scroll />
                            
                        </div>
                    </div>  
                </div> 
                {/* TERMIN */}
                <div className={styles['button-position']}> 
                
                    <ButtonAddCourse />
                </div>
                
            </div>

        </>
    )
}


const AllMySubjects: React.FC<{}> = () => {
    return (
        <>
            <body className={styles['body']}>
                <Nav />
                <Body />
            </body>

            
        </>
    );
}

export default AllMySubjects;