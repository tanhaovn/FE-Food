import React from "react";

const DeleteCategory = ({ category, onDelete, onClose }) => {
  if (!category) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Delete Category</h2>
        <p>
          Are you sure you want to delete <b>{category.name}</b>?
        </p>
        <div className="modal-actions">
          <button
            className="btn save-btn"
            onClick={() => {
              onDelete(category.id);
              onClose();
            }}
          >
            Yes, Delete
          </button>
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
