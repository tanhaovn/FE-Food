import React, { useState } from "react";

const ChooseOrderItem = ({
  items = [],
  products = [],
  orders = [],
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [newItem, setNewItem] = useState({
    order_id: "",
    product_id: "",
    quantity: 1,
    notes: "",
  });

  const [editItem, setEditItem] = useState({});

  // add
  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAdd(newItem);
    setShowAddForm(false);
    setNewItem({ order_id: "", product_id: "", quantity: 1, notes: "" });
  };

  // update
  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(editItem);
    setShowEditForm(false);
  };

  return (
    <>
      <h1 className="title">Order Items</h1>
      <p className="breadcrumb">Hone / List Order Items</p>

      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn filter-btn">Filter</button>
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          + Add Order Item
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order</th>
            <th>Table</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal (₫)</th>
            <th>Note</th>
            <th>Creation date</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>#{value.order?.id || "—"}</td>
                <td>{value.order?.table?.id || "—"}</td>
                <td>{value.product?.name || "—"}</td>
                <td>{value.quantity}</td>
                <td>{value.subtotal?.toLocaleString("vi-VN")}</td>
                <td>{value.notes || "—"}</td>
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
                            setEditItem({
                              id: value.id,
                              order_id: value.order?.id,
                              product_id: value.product?.id,
                              quantity: value.quantity,
                              notes: value.notes,
                            });
                            setShowEditForm(true);
                            setSelected(null);
                          }}
                        >
                          ✏️ Update
                        </button>
                        <button
                          onClick={() => {
                            onDelete(value.id);
                            setSelected(null);
                          }}
                          className="delete-btn"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No Order Items yet</td>
            </tr>
          )}
        </tbody>
      </table>

      {/*Add */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Order Item</h2>
            <form onSubmit={handleAddSubmit}>
              <label>Select Order</label>
              <select
                value={newItem.order_id}
                onChange={(e) =>
                  setNewItem({ ...newItem, order_id: parseInt(e.target.value) })
                }
                required
              >
                <option value="">-- Select Order --</option>
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    #{o.id} -{" "}
                    {o.table?.id ? `Bàn ${o.table.id}` : "Không có bàn"}
                  </option>
                ))}
              </select>

              <label>Select Product</label>
              <select
                value={newItem.product_id}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    product_id: parseInt(e.target.value),
                  })
                }
                required
              >
                <option value="">-- Select Product --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.price?.toLocaleString("vi-VN")}₫
                  </option>
                ))}
              </select>

              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    quantity: parseInt(e.target.value),
                  })
                }
                required
              />

              <label>Note</label>
              <input
                type="text"
                value={newItem.notes}
                onChange={(e) =>
                  setNewItem({ ...newItem, notes: e.target.value })
                }
                placeholder="Ghi chú (tùy chọn)"
              />

              <div className="modal-actions">
                <button className="btn save-btn" type="submit">
                  Save
                </button>
                <button
                  className="btn cancel-btn"
                  type="button"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
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
            <h2>✏️ Update Order Item</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Quality</label>
              <input
                type="number"
                min="1"
                value={editItem.quantity}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    quantity: parseInt(e.target.value),
                  })
                }
                required
              />

              <label>Note</label>
              <input
                type="text"
                value={editItem.notes || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, notes: e.target.value })
                }
              />

              <div className="modal-actions">
                <button className="btn save-btn" type="submit">
                  Save
                </button>
                <button
                  className="btn cancel-btn"
                  type="button"
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

export default ChooseOrderItem;
