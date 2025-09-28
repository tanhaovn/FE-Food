import React, { useState, useEffect } from "react";

const UpdateProduct = ({ product, categories, onUpdate, onClose }) => {
  const [form, setForm] = useState(product);

  useEffect(() => setForm(product), [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="modal">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
