import React, { useState, useEffect } from "react";
import axios from "axios";
import ChooseOrderItem from "./ChooseOrderItem";

const API_URL_ITEMS = "http://localhost:8080/api/orderItems";
const API_URL_PRODUCTS = "http://localhost:8080/api/products";
const API_URL_ORDERS = "http://localhost:8080/api/order";

const NewChooseOrderItem = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [itemsRes, prodRes, orderRes] = await Promise.all([
          axios.get(API_URL_ITEMS),
          axios.get(API_URL_PRODUCTS),
          axios.get(API_URL_ORDERS),
        ]);
        setOrderItems(itemsRes.data.data);
        setProducts(prodRes.data.data);
        setOrders(orderRes.data.data);
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const addOrderItem = async (item) => {
    try {
      const res = await axios.post(API_URL_ITEMS, item);
      setOrderItems([...orderItems, res.data.data]);
    } catch (err) {
      console.error("Error adding OrderItem", err);
    }
  };

  const updateOrderItem = async (updatedItem) => {
    try {
      const res = await axios.put(
        `${API_URL_ITEMS}/${updatedItem.id}`,
        updatedItem
      );
      setOrderItems(
        orderItems.map((i) => (i.id === updatedItem.id ? res.data.data : i))
      );
    } catch (err) {
      console.error("Error while updating OrderItem", err);
    }
  };

  const deleteOrderItem = async (id) => {
    try {
      await axios.delete(`${API_URL_ITEMS}/${id}`);
      setOrderItems(orderItems.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error while deleting OrderItem", err);
    }
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="container">
      <ChooseOrderItem
        items={orderItems}
        products={products}
        orders={orders}
        onAdd={addOrderItem}
        onUpdate={updateOrderItem}
        onDelete={deleteOrderItem}
      />
    </div>
  );
};

export default NewChooseOrderItem;
