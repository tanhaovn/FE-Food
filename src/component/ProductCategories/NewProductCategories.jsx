import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCategories.css";
import ProductCategories from "./ProductCategories";

const API_URL = "http://localhost:8080/api/categories";

const NewProductCategories = () => {
  const [products, setProducts] = useState([]);

  // Fetch all categories
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log("📥 API response:", res.data);
        setProducts(res.data.data); // ✅ lấy mảng data từ BE
      })
      .catch((err) => console.error("❌ Lỗi fetch categories:", err));
  }, []);

  // Xóa category
  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("❌ Lỗi khi xóa:", err));
  };

  // Cập nhật category
  const updateProduct = (updatedProduct) => {
    axios
      .patch(`${API_URL}/${updatedProduct.id}`, updatedProduct)
      .then((res) => {
        setProducts(
          products.map((p) =>
            p.id === updatedProduct.id ? res.data.data : p
          )
        );
      })
      .catch((err) => console.error("❌ Lỗi khi update:", err));
  };

  // Thêm category
  const addProduct = (newProduct) => {
    axios
      .post(API_URL, newProduct)
      .then((res) => {
        setProducts([...products, res.data.data]); // ✅ thêm data mới
      })
      .catch((err) => console.error("❌ Lỗi khi thêm:", err));
  };

  return (
    <div className="container">
      <ProductCategories
        products={products}
        onDelete={deleteProduct}
        onUpdate={updateProduct}
        onAddProduct={addProduct}
      />
    </div>
  );
};

export default NewProductCategories;
