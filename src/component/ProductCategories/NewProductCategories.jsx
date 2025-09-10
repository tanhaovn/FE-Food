import React, { useState } from "react";
import "./ProductCategories.css";
import ProductCategories from "./ProductCategories";

const NewProductCategories = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Foods",
      variantPrice: "Additional Price",
      status: true,
    },
    {
      id: 2,
      name: "Drinks",
      variantPrice: "Additional Price",
      status: true,
    },
  ]);

  // Xóa sản phẩm
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Update sản phẩm
  const updateProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  // Thêm sản phẩm
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
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
