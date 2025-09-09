import React, { useState } from "react";
import "./Product.css";

const Product = ({ products }) => {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    img: "",
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.price &&
      newProduct.stock &&
      newProduct.img
    ) {
      const newItem = {
        ...newProduct,
        id: Date.now(),
      };
      setProductList([...productList, newItem]);
      setNewProduct({ name: "", category: "", price: "", stock: "", img: "" });
      setShowForm(false);
    }
  };

  const filteredProducts = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <br />
      <h1 className="title">Products</h1>
      <p className="breadcrumb">Home / Products / Product List</p>

      <div className="actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or category"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button className="btn filter-btn">Filter</button>
        <button className="btn add-btn" onClick={() => setShowForm(true)}>
          Add
        </button>
      </div>

      {showForm && (
        <div className="add-form">
          <h2>Add New Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
          />
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={newProduct.img}
            onChange={handleChange}
          />
          <br />
          <button class="Save-btn" onClick={handleAdd}>Save</button>
          <button class="Cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <div className="product-list">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="product-item"
            onClick={() => setSelectedProduct(p)}
            style={{ cursor: "pointer" }}
          >
            <img src={p.img} alt={p.name} width={100} />
            <p>{p.name}</p>
            <p>{p.category}</p>
            <p>${p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="product-view">
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.img} alt={selectedProduct.name} width={200} />
          <p>Category: {selectedProduct.category}</p>
          <p>Price: ${selectedProduct.price}</p>
          <p>Stock: {selectedProduct.stock}</p>
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      )}
    </>
  );
};

export default Product;
