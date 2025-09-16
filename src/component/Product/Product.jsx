import React, { useState, useEffect } from "react";
import "./Product.css";

const API_URL = "http://localhost:8080/api/products";
//t k thay đổi code , mà code gì kì vậy
const Product = () => {
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📥 API response:", data);
        setProducts(data.data || []);
      })
      .catch((err) => console.error(" Fetch error:", err));
  }, []);

  // Add Product
  const handleAddChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) =>
      formData.append(key, value)
    );

    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({
          name: "",
          category: "",
          price: "",
          stock: "",
          img: "",
        });
        setShowAddForm(false);
      })
      .catch((err) => console.error("Add product error:", err));
  };

  // Update Product
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditForm(true);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(editProduct).forEach(([key, value]) =>
      formData.append(key, value)
    );

    fetch(`${API_URL}/${editProduct.id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(products.map((p) => (p.id === data.id ? data : p)));
        setShowEditForm(false);
      })
      .catch((err) => console.error("Update product error:", err));
  };

  // Delete Product
  const deleteProduct = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Delete product error:", err));
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

      {/* Table */}
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
