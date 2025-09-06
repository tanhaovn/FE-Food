import React, { useState } from "react";
import "../OrderFood/OrderFood.css";
import Product from "../Product/Product";
import OrderFood from "../OrderFood/OrderFood";
import Anh1 from "../../assets/anh1.jpg";
import Anh2 from "../../assets/anh2.jpg";
import Anh3 from "../../assets/anh3.jpg";
import Anh4 from "../../assets/anh4.jpg";
import Anh5 from "../../assets/anh5.jpg";
import Anh6 from "../../assets/anh6.jpg";
import Anh7 from "../../assets/anh7.jpg";

const NewApp = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Grilled Salmon",
      category: "Food and Beverage",
      price: 12.0,
      stock: 50,
      status: true,
      img: Anh1,
      warning: true,
    },
    {
      id: 2,
      name: "BBQ Ribs",
      category: "Food and Beverage",
      price: 15.0,
      stock: 40,
      status: true,
      img: Anh2,
    },
    {
      id: 3,
      name: "Beef Steak",
      category: "Food and Beverage",
      price: 18.0,
      stock: 30,
      status: true,
      img: Anh3,
    },
    {
      id: 4,
      name: "Chicken with Rice",
      category: "Food and Beverage",
      price: 10.0,
      stock: 60,
      status: true,
      img: Anh4,
    },
    {
      id: 5,
      name: "Fried Chicken Wings",
      category: "Food and Beverage",
      price: 8.0,
      stock: 80,
      status: true,
      img: Anh5,
    },
    {
      id: 6,
      name: "Seafood Platter",
      category: "Food and Snack",
      price: 20.0,
      stock: 25,
      status: true,
      img: Anh6,
    },
    {
      id: 7,
      name: "French Toast with Sugar",
      category: "Food and Snack",
      price: 6.0,
      stock: 100,
      status: true,
      img: Anh7,
    },
  ]);

  // hàm thêm sản phẩm mới
  const addProduct = (product) => {
    setProducts([
      ...products,
      {
        ...product,
        id: products.length + 1,
        img: product.img || Anh1,
        status: true,
      },
    ]);
  };
  // App.jsx
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };
  return (
    <div className="container">
      <Product onAddProduct={addProduct} />
      <OrderFood
        products={products}
        onDelete={deleteProduct}
        onUpdate={updateProduct}
      />
    </div>
  );
};

export default NewApp
