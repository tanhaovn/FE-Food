import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCategories.css";
import ProductCategories from "./ProductCategories";

const API_URL = "http://localhost:8080/api/categories";

const NewProductCategories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Xóa
  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setProducts(products.filter((value) => value.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Cập nhật
  const updateProduct = (updatedProduct) => {
    axios
      .patch(`${API_URL}/${updatedProduct.id}`, updatedProduct)
      .then((res) => {
        setProducts(
          products.map((value) =>
            value.id === updatedProduct.id ? res.data.data : value
          )
        );
      })
      .catch((err) => console.error(err));
  };

  // Thêm
  const addProduct = (newProduct) => {
    axios
      .post(API_URL, newProduct)
      .then((res) => {
        setProducts([...products, res.data.data]);
      })
      .catch((err) => console.error(err));
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
