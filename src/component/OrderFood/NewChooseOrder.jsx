import React, { useState, useEffect } from "react";
import axios from "axios";
import ChooseOrder from "./ChooseOrder";
import "./OrderFood.css";

const API_URL = "http://localhost:8080/api/order";

const NewChooseOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // Thêm
  const addOrder = (newOrder) => {
    axios
      .post(API_URL, newOrder)
      .then((res) => setOrders([...orders, res.data.data]))
      .catch((err) => console.error(err));
  };

  // Cập nhật
  const updateOrder = (updatedOrder) => {
    axios
      .patch(`${API_URL}/${updatedOrder.id}`, updatedOrder)
      .then((res) =>
        setOrders(
          orders.map((o) => (o.id === updatedOrder.id ? res.data.data : o))
        )
      )
      .catch((err) => console.error(err));
  };

  // Xóa
  const deleteOrder = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setOrders(orders.filter((o) => o.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <ChooseOrder
        orders={orders}
        onAddOrder={addOrder}
        onUpdate={updateOrder}
        onDelete={deleteOrder}
      />
    </div>
  );
};

export default NewChooseOrder;
