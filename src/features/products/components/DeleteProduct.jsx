import React from "react";

const DeleteProduct = ({ id, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this product?</p>
      <button onClick={() => onConfirm(id)}>Yes, Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteProduct;
