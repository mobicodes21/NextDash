"use client";

import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPeople,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
} from "react-icons/md";
import { useEffect, useState } from "react";

import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "../sidebar/sidebar.module.css";

const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      { title: "Transactions", path: "/coming-soon", icon: <MdAttachMoney /> },
    ],
  },
  {
    title: "Analytics",
    list: [
      { title: "Revenue", path: "/coming-soon", icon: <MdWork /> },
      { title: "Reports", path: "/coming-soon", icon: <MdAnalytics /> },
      { title: "Teams", path: "/coming-soon", icon: <MdPeople /> },
    ],
  },
  {
    title: "User",
    list: [
      { title: "Settings", path: "/coming-soon", icon: <MdOutlineSettings /> },
      { title: "Help", path: "/coming-soon", icon: <MdHelpCenter /> },
    ],
  },
];
/* Sidebar component */
const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("isLoggedIn=true"));
  }, []);

  const username = isLoggedIn ? "Admin Panel" : "Guest";
  const userEmail = isLoggedIn ? "admin@example.com" : "Not logged in";

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{username}</span>
          <span className={styles.userTitle}>{userEmail}</span>
        </div>
      </div>

      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>

      {isLoggedIn && (
        <button className={styles.logout} onClick={handleLogout}>
          <MdLogout />
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
