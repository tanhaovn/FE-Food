import React, { useState } from "react";

const ChooseOrder = ({ orders = [], onAddOrder, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newOrder, setNewOrder] = useState({
    tableId: "",
    status: "New Order",
    total_amount: 0,
  });
  const [editOrder, setEditOrder] = useState({});

  // thêm
  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddOrder(newOrder);
    setShowAddForm(false);
    setNewOrder({ tableId: "", status: "New Order", total_amount: 0 });
  };

  // cập nhật
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editOrder);
    setShowEditForm(false);
  };

  return (
    <>
      <h1 className="title">Danh sách đơn hàng</h1>
      <p className="breadcrumb">Trang chủ / Quản lý đơn hàng</p>

      <div className="actions">
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Thêm đơn hàng
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bàn</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.table?.id || "—"}</td>
                <td>{value.status}</td>
                <td>{value.total_amount}</td>
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
                            setEditOrder(value);
                            setShowEditForm(true);
                            setSelected(null);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => {
                            onDelete(value.id);
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
              <td colSpan="6">Chưa có đơn hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Thêm đơn hàng</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>ID bàn</label>
                <input
                  name="tableId"
                  value={newOrder.tableId}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, tableId: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Trạng thái</label>
                <select
                  name="status"
                  value={newOrder.status}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, status: e.target.value })
                  }
                >
                  <option value="New Order">New Order</option>
                  <option value="Processed">Processed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <div>
                <label>Tổng tiền</label>
                <input
                  type="number"
                  name="total_amount"
                  value={newOrder.total_amount}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      total_amount: parseInt(e.target.value),
                    })
                  }
                />
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

      {/* Edit Modal */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Cập nhật đơn hàng</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Trạng thái</label>
                <select
                  name="status"
                  value={editOrder.status || ""}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, status: e.target.value })
                  }
                >
                  <option value="New Order">New Order</option>
                  <option value="Processed">Processed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <div>
                <label>Tổng tiền</label>
                <input
                  type="number"
                  name="total_amount"
                  value={editOrder.total_amount || 0}
                  onChange={(e) =>
                    setEditOrder({
                      ...editOrder,
                      total_amount: parseInt(e.target.value),
                    })
                  }
                />
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

export default ChooseOrder;
