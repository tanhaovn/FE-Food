import React, { useState } from "react";
const ToggleButton = ({ product, onUpdate }) => {
  const [isOn, setIsOn] = useState(product.status === 1);

  const toggle = () => {
    const newStatus = isOn ? 0 : 1;
    setIsOn(!isOn);
    const formData = new FormData();
    formData.append("status", newStatus);

    fetch(`http://localhost:8080/api/products/${product.id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        onUpdate(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={`toggle-btn ${isOn ? "on" : ""}`} onClick={toggle}>
      <div className="circle"></div>
    </div>
  );
};

const Product = ({
  products,
  categories,
  onDelete,
  onUpdate,
  onAddProduct,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: null,
    status: 1,
  });

  const handleNewChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setShowAddForm(false);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      image: null,
      status: 1,
    });
  };

  // State Update
  const [selected, setSelected] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  const handleEditClick = (product) => {
    setEditProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.category?.id || "",
      status: product.status,
    });
    setShowEditForm(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditProduct({ ...editProduct, image: files[0] });
    } else {
      setEditProduct({ ...editProduct, [name]: value });
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editProduct);
    setShowEditForm(false);
  };

  return (
    <>
      <br />
      <h1 className="title">ProductList</h1>
      <p className="breadcrumb">Home / Products / Category List</p>
      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn filter-btn">Filter</button>
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Add New Product
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product</th>
            <th></th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((value, index) => (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td>
                  {value.image && (
                    <img
                      src={`http://localhost:8080/images/${value.image}`}
                      alt={value.name}
                      width="60"
                    />
                  )}
                </td>
                <td>{value.name}</td>
                <td>{value.description}</td>
                <td>{value.category?.name || "No Category"}</td>
                <td>{value.price} USD</td>
                <td>
                  <ToggleButton product={value} onUpdate={onUpdate} />
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="action-btn"
                      onClick={() =>
                        setSelected(selected === value.id ? null : value.id)
                      }
                    >
                      ⋮
                    </button>
                    {selected === value.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleEditClick(value)}>
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(value.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Product */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newProduct.name}
                onChange={handleNewChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleNewChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleNewChange}
                required
              />
              <select
                name="categoryId"
                value={newProduct.categoryId}
                onChange={handleNewChange}
                required
              >
                <option value="">-- Select Category --</option>
                {Array.isArray(categories) &&
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleNewChange}
              />
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

      {/* Update Product */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editProduct.name || ""}
                onChange={handleEditChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editProduct.description || ""}
                onChange={handleEditChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={editProduct.price || ""}
                onChange={handleEditChange}
                required
              />
              <select
                name="categoryId"
                value={editProduct.categoryId || ""}
                onChange={handleEditChange}
                required
              >
                <option value="">-- Select Category --</option>
                {Array.isArray(categories) &&
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleEditChange}
              />
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
    </>
  );
};

export default Product;
