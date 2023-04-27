import React from 'react'
import styles from './Body.module.css'
import {useState,useRef} from 'react'
 
// type SelectOptions={
//   label: string
//   value: string
// }


const CourseDropDown:React.FC<{}> = () => {
  const[open,setOpen]=useState<boolean>(false);
  const dropdownRef=useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const elements = ["Course title 1", "Course title 2", "Course title 3", "Course title 4"];
  const handleDropDownFocus=(state:boolean)=>
  {setOpen(!state);};
  console.log(open, dropdownRef.current);
  const handleElementClick = (element: string) => {
    console.log("Element clicked:", element);
    console.log("Element clicked:", activeElement);
    setActiveElement((prevActive) => (prevActive === element ? null : element));
  };
  console.log(activeElement, dropdownRef.current);
 // const handleClickOutsideDropDown=(e:any)=>
 // {
  //  if(open && !dropdownRef.current?.contains(e.target as Node))
  //   setOpen(false);
 // };
  //window.addEventListener("click",handleClickOutsideDropDown)
  return (
    <div className={styles['menu']} ref={dropdownRef}>
      <button onClick={(e)=>handleDropDownFocus(open)}> COURSE</button>
      {open &&(
        <ul>
        {elements.map((element) => (
            <li
            key={element}
            onClick={(e) => handleElementClick(element)}
            className={activeElement === element ? styles.active :""}
          >
        {element}
      </li>
        ))}
      </ul>
      )
      }
    </div>
  )
    }
export default CourseDropDown;