import React, { useState } from "react";

const OrderFood = ({ products, onDelete, onUpdate }) => {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const [editProduct, setEditProduct] = useState({});

  //Thêm
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };
  //Cập nhật
  const handleChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  //Xóa
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editProduct);
    setShowForm(false);
  };

  return (
    <>
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
                      <button onClick={() => onDelete(p.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Update */}
      {showForm && (
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
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={editProduct.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editProduct.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={editProduct.img}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save-btn">Save</button>
                <button type="button" className="btn cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderFood;
//kieu diem