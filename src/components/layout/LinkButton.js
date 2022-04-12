import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';

//to = link destination, text = text of the button
function LinkButton({to, text}){
    return (
        <Link className={styles.btn} to={to}>{text}</Link>
    )
}

export default LinkButton;