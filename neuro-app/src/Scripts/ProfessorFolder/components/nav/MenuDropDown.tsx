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
  console.log(open, dropdownRef.current);
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
          <li>
            <Link to='/AllMySubjects'> View materials </Link>  
          </li>
          <li>
            <Link to='/AllQuestions'>  Quiz questions </Link> 
            </li>
            {/* <li><Link to='/CreateAnExam'> Create an exam </Link> </li> */}
            <li><a href="/CreateAnExam">  Create an exam </a></li>
            {/* <li><Link to='/MyStudentExams'> Student's exams </Link> </li> */}
          <li><a href='/MyStudentExams'> Student's exams </a> </li>

       </ul>
      )
      }
    </div>
  )
    }
export default MenuDropDown;