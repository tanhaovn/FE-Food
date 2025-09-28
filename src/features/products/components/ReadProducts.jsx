import React from "react";

const ReadProducts = ({ products, onEdit, onDelete }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>
                {p.image && (
                  <img
                    src={`http://localhost:8080/images/${p.image}`}
                    alt={p.name}
                    width="60"
                  />
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.category?.name}</td>
              <td>{p.price} USD</td>
              <td>{p.status === 1 ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button onClick={() => onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              No products
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReadProducts;
