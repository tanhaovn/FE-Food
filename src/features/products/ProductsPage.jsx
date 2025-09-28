import React, { useState, useEffect } from "react";
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api/productsApi";
import ReadProducts from "./components/ReadProducts";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import "./Products.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const loadData = () => {
    getProducts().then((res) => setProducts(res.data?.data || []));
    getCategories().then((res) => setCategories(res.data?.data || []));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = (product) => {
    createProduct(product).then(() => {
      loadData();
      setShowCreate(false);
    });
  };

  const handleUpdate = (product) => {
    updateProduct(product.id, product).then(() => {
      loadData();
      setEditing(null);
    });
  };

  const handleDelete = (id) => {
    deleteProduct(id).then(() => {
      loadData();
      setDeleting(null);
    });
  };

  return (
    <div className="container">
      <h1>Products</h1>
      <button onClick={() => setShowCreate(true)}>+ Add Product</button>

      <ReadProducts
        products={products}
        onEdit={setEditing}
        onDelete={setDeleting}
      />

      {showCreate && (
        <CreateProduct
          categories={categories}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {editing && (
        <UpdateProduct
          product={editing}
          categories={categories}
          onUpdate={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <DeleteProduct
          id={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
