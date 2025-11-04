import React, { useState } from "react";

const ChooseOrderItem = ({
  items = [],
  products = [],
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const [newItem, setNewItem] = useState({
    order_id: "",
    product_id: "",
    quantity: 1,
    subtotal: 0,
    notes: "",
  });

  const [editItem, setEditItem] = useState({});

  // 🔹 Submit thêm mới
  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddItem(newItem);
    setShowAddForm(false);
    setNewItem({
      order_id: "",
      product_id: "",
      quantity: 1,
      subtotal: 0,
      notes: "",
    });
  };

  // 🔹 Submit cập nhật
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
            <th>Đơn hàng</th>
            <th>Sản phẩm</th>
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
                <td>
                  {value.product?.name || value.product_id}{" "}
                  {value.product?.price ? `($${value.product.price})` : ""}
                </td>
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

      {/* Modal thêm */}
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
                    setNewItem({
                      ...newItem,
                      order_id: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Sản phẩm</label>
                <select
                  name="product_id"
                  value={newItem.product_id}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    const product = products.find((p) => p.id === id);
                    setNewItem({
                      ...newItem,
                      product_id: id,
                      subtotal: product ? product.price * newItem.quantity : 0,
                    });
                  }}
                  required
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ${p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Số lượng</label>
                <input
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value);
                    const product = products.find(
                      (p) => p.id === newItem.product_id
                    );
                    setNewItem({
                      ...newItem,
                      quantity: qty,
                      subtotal: product ? product.price * qty : 0,
                    });
                  }}
                />
              </div>

              <div>
                <label>Tổng phụ ($)</label>
                <input type="number" value={newItem.subtotal} readOnly />
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

      {/* Modal cập nhật */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Cập nhật món</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Sản phẩm</label>
                <input
                  type="text"
                  value={
                    editItem.product?.name ||
                    `ID: ${editItem.product_id || ""}`
                  }
                  disabled
                />
              </div>

              <div>
                <label>Số lượng</label>
                <input
                  type="number"
                  min="1"
                  value={editItem.quantity || 1}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value);
                    const product = products.find(
                      (p) =>
                        p.id ===
                        (editItem.product?.id || editItem.product_id)
                    );
                    setEditItem({
                      ...editItem,
                      quantity: qty,
                      subtotal: product ? product.price * qty : 0,
                    });
                  }}
                />
              </div>

              <div>
                <label>Tổng phụ ($)</label>
                <input type="number" value={editItem.subtotal || 0} readOnly />
              </div>

              <div>
                <label>Ghi chú</label>
                <input
                  value={editItem.notes || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, notes: e.target.value })
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

export default ChooseOrderItem;
