import React, { useState } from "react";

const ChooseTable = ({ tables = [], onAddTable, onUpdate, onDelete }) => {
  // Add table
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTable, setNewTable] = useState({ status: "Empty" });

  const handleNewChange = (e) => {
    setNewTable({ ...newTable, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddTable(newTable);
    setShowAddForm(false);
    setNewTable({ status: "Empty" });
  };

  // Update table
  const [selected, setSelected] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTable, setEditTable] = useState({});

  const handleEditClick = (table) => {
    setEditTable({ ...table });
    setShowEditForm(true);
    setSelected(null);
  };

  const handleEditChange = (e) => {
    setEditTable({ ...editTable, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editTable);
    setShowEditForm(false);
    setSelected(null);
  };

  return (
    <>
      <h1 className="title">Table List</h1>
      <p className="breadcrumb">Home / Table Management</p>

      <div className="actions">
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Add Table
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables.length > 0 ? (
            tables.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.status}</td>
                <td>{new Date(value.createdAt).toLocaleString()}</td>
                <td>{new Date(value.updatedAt).toLocaleString()}</td>
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
                          Update
                        </button>
                        <button
                          onClick={() => {
                            onDelete(value.id);
                            setSelected(null);
                          }}
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
              <td colSpan="5">No tables available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Table</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={newTable.status}
                  onChange={handleNewChange}
                >
                  <option value="Empty">Empty</option>
                  <option value="Active">Active</option>
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

      {/* Edit Modal */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Table</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={editTable.status || "Empty"}
                  onChange={handleEditChange}
                >
                  <option value="Empty">Empty</option>
                  <option value="Active">Active</option>
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

export default ChooseTable;
