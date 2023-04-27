import React from 'react'
import styles from './Nav.module.css'
import {useState} from 'react'
 
// type SelectOptions={
//   label: string
//   value: string
// }


const LangButton:React.FC<{}> = () => {
  const[selects]=useState();
  return (
    <div className={styles['language-container']}>
      <img src="Globe.png" alt="English" />
      <select  value={selects} onChange={()=>{}}>

          <option className={styles['language-options']}>
            
                English
      
            </option>

          <option className={styles['language-options']}>
            Romana
            </option>
          <option className={styles['language-options']}>
            Francais
            </option>

        </select>
        
    </div>
  )
}


export default LangButton