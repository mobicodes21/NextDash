import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

import Image from "next/image";
import styles from "./rightbar.module.css";

/* Rightbar component */
const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="" fill />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h3 className={styles.title}>
            How to use the new version of the admin dashboard?
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Learn how to navigate the updated dashboard and manage users efficiently.
    Customize settings, view insights, and control access seamlessly.
          </p>
          <p className={styles.desc}>
            Quickly adapt to the redesigned interface and optimize your workflow today.
           
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
