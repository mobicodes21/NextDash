"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdMenu,
} from "react-icons/md";
/* Navbar component */
const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const pathname = usePathname();

  const handleMenuClick = () => {
    toggleSidebar(); //open and close navbar in mobile sizes
  };

  return (
    <div className={styles.container}>
      <div className={styles.left} onClick={handleMenuClick}>
        <MdMenu
          size={24}
          className={styles.hamburger}
          style={{ cursor: "pointer" }}
        />
        <span className={styles.title}>{pathname.split("/").pop()}</span>
      </div>

      <div className={styles.icons}>
        <MdOutlineChat size={20} />
        <MdNotifications size={20} />
        <MdPublic size={20} />
      </div>
    </div>
  );
};

export default Navbar;
