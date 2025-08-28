"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import { deleteUserAction } from "./actions";
import { fetchUsers } from "@/lib/data";
import styles from "@/app/ui/dashboard/users/users.module.css";

const PAGE_SIZE = 5;
/* UserList shows all user items
in this component we will show each 5 item in one page
we used pagination and search component here */
const UsersList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("query") || "";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginationedUsers = filteredUsers.slice(start, end);
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const handleSearch = (q) => {
    router.push(`/dashboard/users?page=1&query=${q}`);
  };

  const handlePageChange = (newPage) => {
    router.push(`/dashboard/users?page=${newPage}&query=${query}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUserAction(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search onChange={handleSearch} placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Active</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginationedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.user}>
                    <img
                      src={user.img_url || "/noavatar.png"}
                      alt={user.username}
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {user.username}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone || "-"}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td>{user.isActive ? "Yes" : "No"}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/users/${user.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => handlePageChange(Math.max(page - 1, 1))}
        onNext={() => handlePageChange(Math.min(page + 1, totalPages))}
      />
    </div>
  );
};

export default UsersList;
