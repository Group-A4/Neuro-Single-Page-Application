import React from 'react'
import styles from './Nav.module.css'
import {useState,useRef} from 'react'
import LangButtonMini from './LangButtonMini';

const BurgerMenu: React.FC<{}> =()=>
{
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
      <div className={styles['burgerMenu-container']} ref={dropdownRef}>
        <button onClick={(e)=>handleDropDownFocus(open)}> <img src="./burger.png" alt="" /> </button>
        {open &&(
          <ul>
         <li><a href="/Upload_materials">    Home </a></li>
         <li><a href="/View_materials">    Profile </a></li>
         {/* <li><a href="/Create_exam">    English </a></li>
         <li><a href="/Create_exam">    Romana </a></li>
         <li><a href="/Create_exam">    Francais </a></li> */}

            <LangButtonMini />
         </ul>
        )
        }
      </div>
    )
}

export default BurgerMenu