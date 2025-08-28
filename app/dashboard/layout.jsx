"use client";
import { useState } from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Footer from "../ui/dashboard/footer/footer";
import styles from "../ui/dashboard/dashboard.module.css";
/* dashboard layout shows all parts of dashboard */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={`${styles.menu} ${sidebarOpen ? styles.open : ""}`}>
        <Sidebar />
      </div>

      {/* Overlay: when sidebar is open we use it for closeness*/}
      {sidebarOpen && <div className={styles.overlay} onClick={closeSidebar} />}

      {/* Content */}
      <div className={styles.content}>
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        {children}
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
