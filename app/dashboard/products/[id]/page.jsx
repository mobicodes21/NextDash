"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import { supabase } from "@/utils/supabaseClient";
/* single product page shows the details of each submitted
product  */
const SingleProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      if (error) console.log("Error fetching product:", error.message);
      else {
        setProduct(data);
        setTitle(data.title);
        setPrice(data.price);
        setStock(data.stock);
        setColor(data.color);
        setSize(data.size);
        setCat(data.cat);
        setDesc(data.desc);
        setImgUrl(data.img_url);
      }
    };
    loadProduct();
  }, [productId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let uploadedUrl = imgUrl;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (uploadError) alert("Upload failed: " + uploadError.message);

      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      uploadedUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("products")
      .update({
        title,
        price,
        stock,
        color,
        size,
        cat,
        desc,
        img_url: uploadedUrl,
      })
      .eq("id", productId);

    if (error) alert("Update failed: " + error.message);
    else {
      alert("Product updated successfully!");
      router.push("/dashboard/products");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.imgWrapper}>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : product.img_url || "/noproduct.jpg"
            }
            alt={title || "No product"}
          />
        </div>
        <div className={styles.username}>{title}</div>
      </div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />

          <label>Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <label>Size</label>
          <textarea value={size} onChange={(e) => setSize(e.target.value)} />

          <label>Category</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>

          <label>Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />

          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
