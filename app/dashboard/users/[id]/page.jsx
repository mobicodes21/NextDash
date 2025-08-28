"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { supabase } from "@/utils/supabaseClient";
/* single user page shows the details of each submitted
product  */
const SingleUserPage = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) console.log("Error fetching user:", error.message);
      else {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setPassword(data.password);
        setPhone(data.phone);
        setAddress(data.address);
        setIsAdmin(data.isAdmin);
        setIsActive(data.isActive);
        setImgUrl(data.img_url);
      }
    };
    loadUser();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let uploadedUrl = imgUrl;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("users")
        .upload(fileName, file);

      if (uploadError) alert("Upload failed: " + uploadError.message);

      const { data: publicUrlData } = supabase.storage
        .from("users")
        .getPublicUrl(fileName);

      uploadedUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("users")
      .update({ username, email, password, phone, address, isAdmin, isActive, img_url: uploadedUrl })
      .eq("id", userId);

    if (error) alert("Update failed: " + error.message);
    else {
      alert("User updated successfully!");
      router.push("/dashboard/users");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.imgWrapper}>
          <img src={file ? URL.createObjectURL(file) : user.img_url || "/noavatar.png"} alt={username || "No user"} />
        </div>
        <div className={styles.username}>{username}</div>
      </div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <label>Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
          <label>Is Admin?</label>
          <select value={isAdmin} onChange={(e) => setIsAdmin(e.target.value === "true")}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>
          <select value={isActive} onChange={(e) => setIsActive(e.target.value === "true")}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};


export default SingleUserPage;