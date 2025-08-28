import styles from "./footer.module.css";
/* Footer component */
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>MobiCodes</div>
      <div className={styles.text}>© All rights reserved.</div>
    </div>
  );
};

export default Footer;
