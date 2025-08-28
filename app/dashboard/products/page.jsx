"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import { deleteProductAction } from "./actions";
import { fetchProducts } from "@/lib/data";
import styles from "@/app/ui/dashboard/products/products.module.css";

const PAGE_SIZE = 5;
/* ProductList shows all product items
in this component we will show each 5 item in one page
we used pagination and search component here */
const ProductsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginationedProducts = filteredProducts.slice(start, end);
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handleSearch = (q) => {
    router.push(`/dashboard/products?page=1&query=${q}`);
  };

  const handlePageChange = (newPage) => {
    router.push(`/dashboard/products?page=${newPage}&query=${query}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProductAction(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search onChange={handleSearch} placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginationedProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.product}>
                    <img
                      src={
                        product.img_url && product.img_url.trim() !== ""
                          ? product.img_url
                          : "/noproduct.jpg"
                      }
                      alt={product.title || "No product"}
                      width={40}
                      height={40}
                      className={styles.productImage}
                    />
                    {product.title}
                  </div>
                </td>
                <td>{product.desc}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{new Date(product.created_at).toLocaleDateString()}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/products/${product.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(product.id)}
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

export default ProductsList;
