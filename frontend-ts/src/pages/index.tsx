import CardLayout from "../components/CardLayout/CardLayout";
import styles from './index.module.css';

const MainContent = () => {
    return(
        <main className={styles.container}>
            <CardLayout />
        </main> 
    )
}

export default MainContent;