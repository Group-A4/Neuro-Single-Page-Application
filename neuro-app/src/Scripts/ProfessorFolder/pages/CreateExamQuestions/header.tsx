import React from 'react'
import styles from './Body.module.css';

// import { Link } from 'react-router-dom';
interface BoxProps {
    point: number;
    setPoint: (point: number) => void;

  }
const header: React.FC<BoxProps> = ({ point, setPoint }) => {
    return (
        <div className={styles.header}>
          
          <label>
            Points:
            <input type="number" value={point} onChange={(e) => setPoint(parseInt(e.target.value))} />
          </label>
          
        </div>
      );
    };
export default header;