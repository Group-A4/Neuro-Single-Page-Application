import React from 'react';
import styles from './Nav.module.css'
import LangButton from './LangButton';
import { Link } from "react-router-dom";
import MenuDropDown from './MenuDropDown';
import BurgerMenu from './BurgerMenu';
import img_logo from './logo1.png';


function Nav(){
  return (
    <nav className={styles.navbar}> 
        <Link to="/" className={styles['logo-link']}>
          <div className={styles['logo-container']}>
            <img src={img_logo} alt=""/>
              <span className={styles['logo-text']} >
                  NeuroApp
              </span>
          </div>
        </Link>

           
        <div className={styles['links-container']}>
          <ul className={styles['link']} >
            <Link to="/Student">Home</Link>
          </ul>

          <ul className={styles['link']} >
            <Link to="/Student">Profile</Link>
           </ul>
              
          <ul className={styles['menu']}>
            <MenuDropDown/>
          </ul>
        </div>

        <LangButton/>
        <BurgerMenu/>
        

    </nav>
  )
}

export default Nav