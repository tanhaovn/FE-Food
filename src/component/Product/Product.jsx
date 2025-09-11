import React, { useState } from "react";
import "./Product.css";
import Anh1 from "../../assets/anh1.jpg";
import Anh2 from "../../assets/anh2.jpg";
import Anh3 from "../../assets/anh3.jpg";
import Anh4 from "../../assets/anh4.jpg";
import Anh5 from "../../assets/anh5.jpg";
import Anh6 from "../../assets/anh6.jpg";
import Anh7 from "../../assets/anh7.jpg";

const Product = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Grilled Salmon",
      category: "Food and Beverage",
      price: 12.0,
      stock: 50,
      status: true,
      img: Anh1,
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

  // State cho Add
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    img: "",
  });

  // State cho Update
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [selected, setSelected] = useState(null);

  // Xử lý input Add
  const handleAddChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId, status: true }]);
    setNewProduct({ name: "", category: "", price: "", stock: "", img: "" });
    setShowAddForm(false);
  };

  // Xử lý Update
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditForm(true);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setProducts(
      products.map((p) => (p.id === editProduct.id ? editProduct : p))
    );
    setShowEditForm(false);
  };

  // Xóa
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <br />
      <h1 className="title">Products</h1>
      <p className="breadcrumb">Home / Products / Product List</p>
      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn filter-btn">Filter</button>
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Add New Product
        </button>
      </div>

      {/* Modal Add */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={newProduct.img}
                  onChange={handleAddChange}
                  placeholder="https://phamtanhao.com/image.jpg"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bảng sản phẩm */}
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td className="product-info">
                {p.img && <img src={p.img} alt={p.name} />}
                <div>
                  <div className="product-name">{p.name}</div>
                  <div className="product-cat">{p.category}</div>
                </div>
              </td>
              <td>${parseFloat(p.price).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                <label className="switch">
                  <input type="checkbox" defaultChecked={p.status} />
                  <span className="slider"></span>
                </label>
              </td>
              <td>
                <div className="dropdown">
                  <button
                    className="action-btn"
                    onClick={() => setSelected(selected === p.id ? null : p.id)}
                  >
                    ⋮
                  </button>
                  {selected === p.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleEditClick(p)}>Update</button>
                      <button onClick={() => deleteProduct(p.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Update */}
      {showEditForm && editProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editProduct.stock}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={editProduct.img}
                  onChange={handleEditChange}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
