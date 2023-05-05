import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <h1 className={styles.h1}>Wilders Book</h1>
      </div>
    </header>
  );
};

export default Header;
