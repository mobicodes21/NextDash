"use client";

import { createClient } from "@supabase/supabase-js";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { useState } from "react";

// کلاینت Supabase با متغیرهای NEXT_PUBLIC_
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
/* addUserPage provides the ability of adding new user */

const AddUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const form = e.target;
    const file = form.image.files[0];
    let imageUrl = "/noavatar.png"; // default image

    // if file uploaded
    if (file) {
      const filePath = `user-images/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("users")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        setErrorMsg("Failed to upload image. Using default avatar.");
      } else {
        const { data } = supabase.storage.from("users").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }
    }

    const user = {
      username: form.username.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      phone: form.phone.value.trim() || null,
      isAdmin: form.isAdmin.value === "true",
      isActive: form.isActive.value === "true",
      address: form.address.value.trim() || null,
      img_url: imageUrl, //image link
    };

    // primary validation
    if (!user.username || !user.email || !user.password) {
      setErrorMsg("Username, email, and password are required.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("users").insert([user]);
    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMsg("Failed to add user.");
    } else {
      setSuccessMsg("User added successfully!");
      form.reset();
      console.log("Added user:", data);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input type="tel" placeholder="Phone" name="phone" />
        <select name="isAdmin">
          <option value={false} selected>
            Is Admin?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive">
          <option value={true} selected>
            Is Active?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea
          name="address"
          cols="30"
          rows="16"
          placeholder="Address"
        ></textarea>

        <input type="file" name="image" accept="image/*" />

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
