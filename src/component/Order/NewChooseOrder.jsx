import React, { useState, useEffect } from "react";
import axios from "axios";
import ChooseOrder from "./ChooseOrder";
import "./OrderFood.css";

const API_URL = "http://localhost:8080/api/order";

const NewChooseOrder = () => {
  const [orders, setOrders] = useState([]);

  // LOAD TẤT CẢ ĐƠN
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log("API data:", res.data);

        // BE đang trả về dạng { message, data }
        setOrders(res.data.data || []);
      })
      .catch((err) => console.error("Lỗi khi tải đơn hàng:", err));
  }, []);

  // add
  const addOrder = (newOrder) => {
    axios
      .post(API_URL, newOrder)
      .then((res) => {
        const added = res.data.data;
        if (!added) return;

        setOrders((prev) => [...prev, added]);
      })
      .catch((err) => console.error("Lỗi khi thêm đơn hàng:", err));
  };

  // update
const updateOrder = (updatedOrder) => {
  const body = {
    status: updatedOrder.status,
    total_amount: updatedOrder.total_amount,
  };

  axios.put(`${API_URL}/${updatedOrder.id}`, body)
    .then((res) => {
      const updated = res.data.data;
      if (!updated) return;

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );
    })
    .catch((err) => console.error("Lỗi khi cập nhật:", err));
};


  // delete
  const deleteOrder = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      })
      .catch((err) => console.error("Lỗi khi xóa:", err));
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
