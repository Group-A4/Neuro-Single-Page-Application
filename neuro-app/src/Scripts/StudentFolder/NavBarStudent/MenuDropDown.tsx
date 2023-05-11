import React from 'react'
import styles from './Nav.module.css'
import {useState,useRef} from 'react'
import { Link } from 'react-router-dom';
 
// type SelectOptions={
//   label: string
//   value: string
// }


const MenuDropDown:React.FC<{}> = () => {
  const[open,setOpen]=useState<boolean>(false);
  const dropdownRef=useRef<HTMLDivElement>(null);
  const handleDropDownFocus=(state:boolean)=>
  {setOpen(!state);};
  // console.log(open, dropdownRef.current);
  const handleClickOutsideDropDown=(e:any)=>
  {
    if(open && !dropdownRef.current?.contains(e.target as Node))
     setOpen(false);
  };
  window.addEventListener("click",handleClickOutsideDropDown)
  return (
    <div className={styles['menu']} ref={dropdownRef}>
      <button onClick={(e)=>handleDropDownFocus(open)}> Menu</button>
      {open &&(
        <ul>
          <div className={styles['button--menu']}>
            <Link to='/UploadMaterials'>View materials</Link>  
          </div>
          <div className={styles['button--menu']}>
            <Link to='/UploadMaterials'>Take a mock exam</Link>  
          </div>
          <div className={styles['button--menu']}>
            <Link to='/UploadMaterials'>Student's exams</Link>  
          </div>
          <div className={styles['button--menu']}>
            <Link to='/UploadMaterials'>My exam results</Link>  
          </div>
          {/*
          <li>
            <Link to='/ViewMaterials'>Take a mock exam</Link> </li>
          {/* <li><Link to='/MyStudentExams'> Student's exams </Link> </li> }
          <li><a href='/MyStudentExams'>Take an exam</a> </li>
          {/* <li><Link to='/CreateAnExam'> Create an exam </Link> </li> }
          <li><a href="/CreateAnExam">My exam results</a></li>
          */}
       </ul>
      )
      }
    </div>
  )
    }
export default MenuDropDown;