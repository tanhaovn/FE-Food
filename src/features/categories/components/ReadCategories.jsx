import React, { useState } from "react";

const ReadCategories = ({ categories, onEdit, onDelete }) => {
  const [selected, setSelected] = useState(null);

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat, index) => (
          <tr key={cat.id}>
            <td>{index + 1}</td>
            <td>{cat.name}</td>
            <td>
              <div className="dropdown">
                <button
                  className="action-btn"
                  onClick={() => setSelected(selected === cat.id ? null : cat.id)}
                >
                  ⋮
                </button>
                {selected === cat.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => onEdit(cat)}>Edit</button>
                    <button
                      onClick={() => onDelete(cat.id)}
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
  );
};

export default ReadCategories;
