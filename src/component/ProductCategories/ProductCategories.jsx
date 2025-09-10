import React, { useState } from "react";

const ProductCategories = ({ onAddProduct, products, onDelete, onUpdate }) => {
  // State cho thêm sản phẩm
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    variantPrice: "",
    status: true,
  });

  const handleNewChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      ...newProduct,
      id: Date.now(), // id tạm thời
    });
    setShowAddForm(false);
    setNewProduct({ name: "", variantPrice: "", status: true });
  };

  // State cho update sản phẩm
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

      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Variant Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td className="variant">{p.variantPrice}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={p.status}
                    onChange={() =>
                      onUpdate({ ...p, status: !p.status })
                    }
                  />
                  <span className="slider"></span>
                </label>
              </td>
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
                      <button onClick={() => onDelete(p.id)} className="delete-btn">
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
            <h2>Add New Product</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleNewChange}
                  required
                />
              </div>
              <div>
                <label>Variant Price</label>
                <select
                  name="variantPrice"
                  value={newProduct.variantPrice}
                  onChange={handleNewChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Additional Price">Additional Price</option>
                  <option value="Specific Price">Specific Price</option>
                </select>
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
            <h2>Update Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Variant Price</label>
                <select
                  name="variantPrice"
                  value={editProduct.variantPrice || ""}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Additional Price">Additional Price</option>
                  <option value="Specific Price">Specific Price</option>
                </select>
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
