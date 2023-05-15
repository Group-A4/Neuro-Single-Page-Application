import React from 'react'
import styles from './Body.module.css'
import {useState,useRef} from 'react'
import { Link } from 'react-router-dom';
import photo_option from './option.png';
 
// type SelectOptions={
//   label: string
//   value: string
// }
interface ScrollProps {
  id_lecture: string;
}


const Scroll: React.FC<ScrollProps> = ({ id_lecture }) => {
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
    <div className={styles['body-scroll']} ref={dropdownRef}>
      <button onClick={(e) => handleDropDownFocus(open)}><img src={photo_option} alt="" /></button>
      {open &&(
        <ul>
          <li>
            <Link to='/AddMAterialsLesson'>Add materials </Link>  
          </li>
          <li>
          <Link to={`/ViewLEctureMaterials?id_lecture=${id_lecture}`}>View materials</Link></li>
          {/* <li><Link to='/MyStudentExams'> Student's exams </Link> </li> */}
          <li><a href='/ViewQuestionAnswer'>View Quiz questions </a> </li>
          {/* <li><Link to='/CreateAnExam'> Create an exam </Link> </li> */}
          <li><a href="">Rename </a></li>
          <li><a href="">Delete </a></li>
       </ul>
      )
      }
    </div>
  )
    }
export default Scroll;