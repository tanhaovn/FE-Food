import React, { useState, useEffect } from "react";

const UpdateCategory = ({ category, onUpdate, onClose }) => {
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    if (category) setForm(category);
  }, [category]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn save-btn">
              Save
            </button>
            <button type="button" className="btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
