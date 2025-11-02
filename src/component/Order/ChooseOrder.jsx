import React, { useState } from "react";

const ChooseOrder = ({ orders = [], onAddOrder, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newOrder, setNewOrder] = useState({
    table_id: "",
    status: "Pending",
    total_amount: 0,
    items: [],
  });
  const [editOrder, setEditOrder] = useState({});

  // thêm
  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddOrder(newOrder);
    setShowAddForm(false);
    setNewOrder({
      table_id: "",
      status: "Pending",
      total_amount: 0,
      items: [],
    });
  };

  // cập nhật
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editOrder);
    setShowEditForm(false);
  };

  return (
    <>
      <h1 className="title">List of orders</h1>
      <p className="breadcrumb">Home / Order Management</p>

      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn filter-btn">Filter</button>
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Add order
        </button>
      </div>
      <div className="actions"></div>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Table</th>
            <th>Status</th>
            <th>Total amount</th>
            <th>Creation date</th>
            <th>Operation</th>
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
                  name="table_id"
                  value={newOrder.table_id}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      table_id: parseInt(e.target.value),
                    })
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
                  <option value="Pending">Pending</option>
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
                  <option value="Pending">Pending</option>
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
