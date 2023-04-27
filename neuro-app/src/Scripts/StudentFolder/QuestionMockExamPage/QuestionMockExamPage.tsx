import React from 'react'
import Nav from '../NavBarStudent/Nav';
import styles from '../../../CSS/Body.module.css'

const Body: React.FC<{}> = () => {
    return (

        <body className={styles['body']}>

            <div className={styles['body--img--container']}>
                    
               
            </div>
        </body>


    )
}
function Question() {
    return (
        <body className={styles['body']}>
            <Nav />
            <Body />
        </body>
    );
}

export default Question;