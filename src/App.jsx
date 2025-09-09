import React, { useState } from "react";
import Product from "./component/Product/Product";
import Sidebar from "./component/layout/Sidebar/Sidebar";

import Anh1 from "./assets/anh1.jpg";
import Anh2 from "./assets/anh2.jpg";
import Anh3 from "./assets/anh3.jpg";
import Anh4 from "./assets/anh4.jpg";
import Anh5 from "./assets/anh5.jpg";
import Anh6 from "./assets/anh6.jpg";
import Anh7 from "./assets/anh7.jpg";

export default function App() {
  const [products] = useState([
    { id: 1, name: "Grilled Salmon", category: "Food and Beverage", price: 12, stock: 50, img: Anh1 },
    { id: 2, name: "BBQ Ribs", category: "Food and Beverage", price: 15, stock: 40, img: Anh2 },
    { id: 3, name: "Beef Steak", category: "Food and Beverage", price: 18, stock: 30, img: Anh3 },
    { id: 4, name: "Chicken with Rice", category: "Food and Beverage", price: 10, stock: 60, img: Anh4 },
    { id: 5, name: "Fried Chicken Wings", category: "Food and Beverage", price: 8, stock: 80, img: Anh5 },
    { id: 6, name: "Seafood Platter", category: "Food and Snack", price: 20, stock: 25, img: Anh6 },
    { id: 7, name: "French Toast with Sugar", category: "Food and Snack", price: 6, stock: 100, img: Anh7 },
  ]);

  return (
    <>
      <Sidebar />
      <div className="container">
        <Product products={products} />
      </div>
    </>
  );
}
