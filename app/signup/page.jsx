"use client";

import styles from "@/app/ui/signup/signup.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
/*  signup component gives email & username & password
and redirect user to login page */
export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
// storing user info in DB
// check email & password don`t be empty
if (email && password) {
      alert("ثبت‌نام موفق! حالا لاگین کن.");
      router.push("/login");
    } else {
      alert("Sign up failed: ایمیل/پسورد خالیه");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignUp}>
        <h1 className={styles.title}>Sign Up</h1>
                <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

      </form>

    </div>
  );
}