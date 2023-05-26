import React from 'react'
import styles from './Body.module.css';
import withAuth from '../../../../WithAuth';

// import { Link } from 'react-router-dom';
interface HeaderProps {
  point: number | string;
  setPoint: (newPoints: number | string) => void;

}
const header: React.FC<HeaderProps> = ({ point, setPoint }) => {
  return (
    <div className={styles.header}>
      <label className={styles.label}>
        Points:
        <input
          type="number"
          step="1"
          min="0"
          value={point}
          onChange={(event) => setPoint(event.target.value)}
        />
      </label>

    </div>
  );
};
export default header;