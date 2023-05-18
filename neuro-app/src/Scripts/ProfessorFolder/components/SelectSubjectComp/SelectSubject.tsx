import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from './Body.module.css'
import { useState, useEffect } from "react";
import img_scroll from './scroll.png'

// type SelectOptions={
//   label: string
//   value: string
// }


const SelectSubject: React.FC<{}> = () => {

    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
        setSelectedOption("");
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };




    return (
        <div className={styles['subject-container']}>
            <select id="menu" value={selectedOption} onChange={handleChange}>
                <option value="" disabled hidden>
                    Lectures options

                </option>
                <option className={styles['subject-options']}>
                    Subject 1
                </option>

                <option className={styles['subject-options']}>
                    Subject 2
                </option>

                <option className={styles['subject-options']}>
                    Subject 3
                </option>
            </select>
            <div className="child">
                {/* SAGEATA */}
            </div>
            
        </div>
    )
}


export default SelectSubject