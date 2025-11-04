import React, { useState, useEffect } from "react";
import axios from "axios";
import ChooseOrderItem from "./ChooseOrderItem";
import "./OrderFood.css";

const API_URL = "http://localhost:8080/api/orderItems";
const API_PRODUCTS = "http://localhost:8080/api/products";

const NewChooseOrderItem = () => {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  // 🔹 Load OrderItems
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setItems(res.data.data || res.data))
      .catch((err) => console.error("Lỗi khi tải danh sách món:", err));
  }, []);

  // 🔹 Load Products
  useEffect(() => {
    axios
      .get(API_PRODUCTS)
      .then((res) => setProducts(res.data.data || res.data))
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, []);

  // 🔹 Thêm món mới
  const addItem = (newItem) => {
    const payload = {
      order: { id: newItem.order_id },
      product: { id: newItem.product_id },
      quantity: newItem.quantity,
      subtotal: newItem.subtotal,
      notes: newItem.notes,
    };

    axios
      .post(API_URL, payload)
      .then((res) => setItems([...items, res.data.data || res.data]))
      .catch((err) => console.error("Lỗi khi thêm món:", err));
  };

  // 🔹 Cập nhật món
  const updateItem = (updatedItem) => {
    const payload = {
      order: updatedItem.order
        ? { id: updatedItem.order.id }
        : { id: updatedItem.order_id },
      product: updatedItem.product
        ? { id: updatedItem.product.id }
        : { id: updatedItem.product_id },
      quantity: updatedItem.quantity,
      subtotal: updatedItem.subtotal,
      notes: updatedItem.notes,
    };

    axios
      .patch(`${API_URL}/${updatedItem.id}`, payload)
      .then((res) =>
        setItems(
          items.map((i) =>
            i.id === updatedItem.id ? res.data.data || res.data : i
          )
        )
      )
      .catch((err) => console.error("Lỗi khi cập nhật món:", err));
  };

  // 🔹 Xóa món
  const deleteItem = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setItems(items.filter((i) => i.id !== id)))
      .catch((err) => console.error("Lỗi khi xóa món:", err));
  };

  return (
    <div className="container">
      <ChooseOrderItem
        items={items}
        products={products}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onDeleteItem={deleteItem}
      />
    </div>
  );
};

export default NewChooseOrderItem;
