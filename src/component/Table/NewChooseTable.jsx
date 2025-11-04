import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import ChooseTable from "./ChooseTable";

const API_URL = "http://localhost:8080/api/table";

const NewChooseTable = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setTables(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

// Xóa
const deleteTable = (id) => {
  axios
    .delete(`${API_URL}?id=${id}`)
    .then(() => {
      setTables(tables.filter((t) => t.id !== id));
    })
    .catch((err) => console.error(err));
};

  // Cập nhật
  const updateTable = (updatedTable) => {
    axios
      .put(`${API_URL}/${updatedTable.id}`, updatedTable)
      .then((res) => {
        const updated = res.data.data || res.data;
        setTables(tables.map((t) => (t.id === updatedTable.id ? updated : t)));
      })
      .catch((err) => console.error(err));
  };

  // Thêm
  const addTable = (newTable) => {
    axios
      .post(API_URL, newTable)
      .then((res) => {
        setTables([...tables, res.data.data]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <ChooseTable
        tables={tables}
        onAddTable={addTable}
        onUpdate={updateTable}
        onDelete={deleteTable}
      />
    </div>
  );
};

export default NewChooseTable;
