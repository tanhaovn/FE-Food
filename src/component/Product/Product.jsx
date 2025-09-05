import React, { useState } from "react";

const Product = ({ onAddProduct }) => {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setShowForm(false);
    setNewProduct({ name: "", category: "", price: "", stock: "" }); 
  };

  return (
    <>
    <br />
      <h1 className="title">Products</h1>
      <p className="breadcrumb">Home / Products / Product List</p>
      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn filter-btn">Filter</button>
        <button className="btn add-btn" onClick={() => setShowForm(true)}>
          + Add New Product
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={newProduct.img || ""}
                  onChange={handleChange}
                  placeholder="https://phamtanhao.com/image.jpg"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleChange}
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
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
