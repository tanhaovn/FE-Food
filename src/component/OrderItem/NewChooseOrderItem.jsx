import React, { useState, useEffect } from "react";
import axios from "axios";
import ChooseOrderItem from "./ChooseOrderItem";
import "./OrderFood.css";

const API_URL = "http://localhost:8080/api/orderItems";

const NewChooseOrderItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setItems(res.data.data || res.data))
      .catch((err) => console.error("Lỗi khi tải danh sách món:", err));
  }, []);

  const addItem = (newItem) => {
    axios
      .post(API_URL, newItem)
      .then((res) => setItems([...items, res.data.data || res.data]))
      .catch((err) => console.error("Lỗi khi thêm món:", err));
  };

  const updateItem = (updatedItem) => {
    axios
      .patch(`${API_URL}/${updatedItem.id}`, updatedItem)
      .then((res) =>
        setItems(items.map((i) => (i.id === updatedItem.id ? res.data.data || res.data : i)))
      )
      .catch((err) => console.error("Lỗi khi cập nhật món:", err));
  };

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
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onDeleteItem={deleteItem}
      />
    </div>
  );
};

export default NewChooseOrderItem;
