import React, { useState } from "react";

const ChooseTable = ({ tables, onAddTable, onUpdate, onDelete }) => {
  // Add
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTable, setNewTable] = useState({
    name: "",
    status: 0,
  });

  const handleNewChange = (e) => {
    setNewTable({ ...newTable, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddTable(newTable);
    setShowAddForm(false);
    setNewTable({ name: "", status: 0 });
  };

  // Update
  const [selected, setSelected] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTable, setEditTable] = useState({});

  const handleEditClick = (table) => {
    setEditTable(table);
    setShowEditForm(true);
  };

  const handleEditChange = (e) => {
    setEditTable({ ...editTable, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editTable);
    setShowEditForm(false);
  };

  return (
    <>
      <h1 className="title">Danh sách bàn</h1>
      <p className="breadcrumb">Trang chủ / Quản lý bàn</p>
      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Tìm bàn..." />
        </div>
        <button className="btn filter-btn">Lọc</button>
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Thêm bàn
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên bàn</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((value) => (
            <tr key={value.id}>
              <td>{value.id}</td>
              <td>{value.name}</td>
              <td>{value.status === 1 ? "Đang hoạt động" : "Trống"}</td>
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
                        Sửa
                      </button>
                      <button
                        onClick={() => onDelete(value.id)}
                        className="delete-btn"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Thêm bàn mới</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>Tên bàn</label>
                <input
                  type="text"
                  name="name"
                  value={newTable.name}
                  onChange={handleNewChange}
                  required
                />
              </div>
              <div>
                <label>Trạng thái</label>
                <select
                  name="status"
                  value={newTable.status}
                  onChange={handleNewChange}
                >
                  <option value={0}>Trống</option>
                  <option value={1}>Đang hoạt động</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save-btn">
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Cập nhật bàn</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Tên bàn</label>
                <input
                  type="text"
                  name="name"
                  value={editTable.name || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Trạng thái</label>
                <select
                  name="status"
                  value={editTable.status || 0}
                  onChange={handleEditChange}
                >
                  <option value={0}>Trống</option>
                  <option value={1}>Đang hoạt động</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save-btn">
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={() => setShowEditForm(false)}
                >
                  Hủy
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
