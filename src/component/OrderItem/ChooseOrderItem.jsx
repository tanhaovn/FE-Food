import React, { useState } from "react";

const ChooseOrderItem = ({ items = [], onAddItem, onUpdateItem, onDeleteItem }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newItem, setNewItem] = useState({
    order_id: "",
    product_id: "",
    quantity: 1,
    subtotal: 0,
    notes: ""
  });
  const [editItem, setEditItem] = useState({});

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddItem(newItem);
    setShowAddForm(false);
    setNewItem({ order_id: "", product_id: "", quantity: 1, subtotal: 0, notes: "" });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdateItem(editItem);
    setShowEditForm(false);
  };

  return (
    <>
      <h1 className="title">Danh sách món trong đơn hàng</h1>
      <p className="breadcrumb">Trang chủ / Quản lý món</p>

      <div className="actions">
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Thêm món
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Đơn hàng</th>
            <th>ID Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tổng phụ</th>
            <th>Ghi chú</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.order?.id || value.order_id}</td>
                <td>{value.product?.id || value.product_id}</td>
                <td>{value.quantity}</td>
                <td>{value.subtotal}</td>
                <td>{value.notes}</td>
                <td>{new Date(value.createdAt).toLocaleString()}</td>
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
                        <button
                          onClick={() => {
                            setEditItem(value);
                            setShowEditForm(true);
                            setSelected(null);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => {
                            onDeleteItem(value.id);
                            setSelected(null);
                          }}
                          className="delete-btn"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Chưa có món nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Thêm món mới</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>ID Đơn hàng</label>
                <input
                  name="order_id"
                  value={newItem.order_id}
                  onChange={(e) =>
                    setNewItem({ ...newItem, order_id: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <label>ID Sản phẩm</label>
                <input
                  name="product_id"
                  value={newItem.product_id}
                  onChange={(e) =>
                    setNewItem({ ...newItem, product_id: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <label>Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <label>Tổng phụ</label>
                <input
                  type="number"
                  name="subtotal"
                  value={newItem.subtotal}
                  onChange={(e) =>
                    setNewItem({ ...newItem, subtotal: parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <label>Ghi chú</label>
                <input
                  name="notes"
                  value={newItem.notes}
                  onChange={(e) =>
                    setNewItem({ ...newItem, notes: e.target.value })
                  }
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save-btn">Lưu</button>
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

      {/* Edit Form */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Cập nhật món</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={editItem.quantity || 0}
                  onChange={(e) =>
                    setEditItem({ ...editItem, quantity: parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <label>Tổng phụ</label>
                <input
                  type="number"
                  name="subtotal"
                  value={editItem.subtotal || 0}
                  onChange={(e) =>
                    setEditItem({ ...editItem, subtotal: parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <label>Ghi chú</label>
                <input
                  name="notes"
                  value={editItem.notes || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, notes: e.target.value })
                  }
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save-btn">Lưu</button>
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

export default ChooseOrderItem;
