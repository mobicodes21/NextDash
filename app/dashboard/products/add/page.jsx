"use client";

import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
/* addProductPage provides the ability of adding new product for user  */
const AddProductsPage = () => {
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

    let imageUrl = "/noproduct.jpg"; // default image

    if (file) {
      try {
        const filePath = `product-images/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // get publicUrl completly
        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl; // storing URL
      } catch (err) {
        console.error("Upload failed:", err);
        setErrorMsg("Failed to upload image, using default image.");
      }
    }

    const product = {
      title: form.title.value.trim(),
      category: form.cat.value,
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      color: form.color.value.trim(),
      size: form.size.value.trim(),
      desc: form.desc.value.trim(),
      img_url: imageUrl, // complete URL needed
    };

    if (
      !product.title ||
      !product.category ||
      product.price < 0 ||
      product.stock < 0
    ) {
      setErrorMsg(
        "Please fill all required fields and ensure price/stock are positive."
      );
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("products").insert([product]);
    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMsg("Failed to add product.");
    } else {
      setSuccessMsg("Product added successfully!");
      form.reset();
      console.log("Added product:", data);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title" required />
        <select name="cat" required>
          <option value="">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          name="price"
          min="0"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          min="0"
          required
        />
        <input type="text" placeholder="Color" name="color" />
        <input type="text" placeholder="Size" name="size" />
        <textarea
          name="desc"
          cols="30"
          rows="16"
          placeholder="Description"
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

export default AddProductsPage;
