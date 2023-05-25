import React from 'react'
import styles from './Nav.module.css'
import {useState,useRef} from 'react'
import { Link } from 'react-router-dom';
 
// type SelectOptions={
//   label: string
//   value: string
// }

const handleLogout = () => {
  localStorage.clear();
};

const MenuDropDown:React.FC<{}> = () => {
  const[open,setOpen]=useState<boolean>(false);
  const dropdownRef=useRef<HTMLDivElement>(null);
  const handleDropDownFocus=(state:boolean)=>
  {setOpen(!state);};
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
            <Link to='/ChooseCreate'> Create an account or a subject </Link>  
          </li>
          <li>
            <Link to='/ChooseAccountPage'> Modify/Delete an account </Link> 
          </li>
          <li>
            <Link to='/ChooseSubjects'> Modify/Delete a subject </Link> 
          </li>
          <li>
            <Link to='/' onClick={handleLogout}> Logout </Link>
          </li>
       </ul>
      )
      }
    </div>
  )
    }
export default MenuDropDown;