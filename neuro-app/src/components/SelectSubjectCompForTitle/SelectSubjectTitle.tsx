import React from 'react'
import styles from './Body.module.css'
import { useState } from 'react'
import img_scroll from './scroll.png'

// type SelectOptions={
//   label: string
//   value: string
// }


const SelectSubjectTitle: React.FC<{}> = () => {
    const [selects] = useState();
    return (
        <div className={styles['subject-container']}>
            <select value={selects} onChange={() => { }}>

                <option className={styles['subject-options']}>
                    Course 1
                </option>

                <option className={styles['subject-options']}>
                    Course 2
                </option>

                <option className={styles['subject-options']}>
                    Course 3
                </option>

                
            </select>
            
            {/* <img src={img_scroll} alt="" className={styles['img-options']} /> */}
        </div>
    )
}


export default SelectSubjectTitle