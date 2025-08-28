"use client";

import styles from "@/app/ui/login/login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* login page redirects user to dashboard */
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (username && password) {
      // setting cookies which is valid until 7 days
      document.cookie = "isLoggedIn=true; path=/; max-age=604800";

      setLoading(false);
      // after successful login redirects to dashboard page
      router.push("/dashboard");
      router.refresh();
    } else {
      setLoading(false);
      alert("Login failed: Username or Password is invalid.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.title}>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <span>
          Don`t have an account? <a href="/signup">Sign Up</a>
        </span>
      </form>
    </div>
  );
}
