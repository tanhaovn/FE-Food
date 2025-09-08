import React from "react";
const ProductUser = () => {
  return (
    <>
      <br />
      <h1 className="title">Order</h1>
      <p className="breadcrumb">Home / Products / Product List</p>
      <div className="actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn filter-btn">Filter</button>
      </div>
    </>
  );
};

export default ProductUser;
