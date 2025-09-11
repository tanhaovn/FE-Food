import React, { useState } from "react";

const ProductCategories = ({ onAddProduct, products, onDelete, onUpdate }) => {
  // State cho thêm category
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
  });

  const handleNewChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct); 
    setShowAddForm(false);
    setNewProduct({ name: "" });
  };

  // State cho update category
  const [selected, setSelected] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditForm(true);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editProduct);
    setShowEditForm(false);
  };

  return (
    <>
      <br />
      <h1 className="title">Product Categories</h1>
      <p className="breadcrumb">Home / Products / Category List</p>
      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn filter-btn">Filter</button>
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Add New Category
        </button>
      </div>

      {/* Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="action-btn"
                    onClick={() =>
                      setSelected(selected === p.id ? null : p.id)
                    }
                  >
                    ⋮
                  </button>
                  {selected === p.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleEditClick(p)}>Edit</button>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="delete-btn"
                      >
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

      {/* Modal Add */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Category</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleNewChange}
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

      {/* Modal Update */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Category</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name || ""}
                  onChange={handleEditChange}
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

export default ProductCategories;
  