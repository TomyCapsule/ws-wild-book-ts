import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <p className={styles.p}>&copy; 2022 Wild Code School</p>
      </div>
    </footer>
  );
};

export default Footer;
