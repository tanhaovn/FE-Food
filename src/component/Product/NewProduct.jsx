import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import Product from "./Product";

const API_URL_PRODUCTS = "http://localhost:8080/api/products";
const API_URL_CATEGORIES = "http://localhost:8080/api/categories";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL_PRODUCTS)
      .then((res) => {
        console.log("API /products:", res.data);
        setProducts(res.data?.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(API_URL_CATEGORIES)
      .then((res) => {
        console.log("API /categories:", res.data);
        setCategories(res.data?.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Xóa
  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL_PRODUCTS}/${id}`)
      .then(() => {
        setProducts(products.filter((value) => value.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Cập nhật
  const updateProduct = (updatedProduct) => {
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("description", updatedProduct.description);
    formData.append("price", updatedProduct.price);
    formData.append("status", updatedProduct.status || 1);
    formData.append("category_id", updatedProduct.categoryId);
    if (updatedProduct.image) {
      formData.append("image", updatedProduct.image);
    }

    axios
      .patch(`${API_URL_PRODUCTS}/${updatedProduct.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        return axios.get(API_URL_PRODUCTS);
      })
      .then((res) => {
        setProducts(res.data?.data || []);
      })
      .catch((err) =>
        console.error("UPDATE error:", err.response?.data || err)
      );
  };

  // Thêm
  const addProduct = (newProduct) => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("status", newProduct.status || 1);
    formData.append("category_id", newProduct.categoryId);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    axios
      .post(API_URL_PRODUCTS, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("POST /products:", res.data);
        axios.get(API_URL_PRODUCTS).then((res) => {
          setProducts(res.data?.data || []);
        });
      })
      .catch((err) => console.error("POST error:", err.response?.data || err));
  };

  return (
    <div className="container">
      <Product
        products={products}
        categories={categories}
        onDelete={deleteProduct}
        onUpdate={updateProduct}
        onAddProduct={addProduct}
      />
    </div>
  );
};

export default NewProduct;
