import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import "./App.css";
import DataTable from "./components/DataTable";

function App() { 
  const [editingRowId, setEditingRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilterRecords(records);
  }, [records]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentRecords = filterRecords.slice(startIndex, endIndex);

  const handleFilter = (searchValue) => {
    const newData = records.filter(
      (row) =>
        row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.role.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterRecords(newData);
    setCurrentPage(1);
  };

  const handleEditNameChange = (value) => {
    setEditName(value);
  };

  const handleEditEmailChange = (value) => {
    setEditEmail(value);
  };

  const handleEditRoleChange = (value) => {
    setEditRole(value);
  };

  const handleEdit = (row) => {
    setEditingRowId(row.id);
    setEditName(row.name);
    setEditEmail(row.email);
    setEditRole(row.role);
  };

  const handleSaveEdit = (row) => {
    if (editName.trim() === "" || editEmail.trim() === "" || editRole.trim() === "") {
      setError("All fields are required.");
      return;
    }

    const updatedRecords = records.map((record) => {
      if (record.id === row.id) {
        return {
          ...record,
          name: editName,
          email: editEmail,
          role: editRole,
        };
      }
      return record;
    });
    setRecords(updatedRecords);
    setEditingRowId(null);
    setEditName("");
    setEditEmail("");
    setEditRole("");
    setError("");
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setEditName("");
    setEditEmail("");
    setEditRole("");
  };

  const handleDelete = (row) => {
    const updatedRecords = records.filter((record) => record.id !== row.id);
    setRecords(updatedRecords);
  };

  const handleRowSelected = (row) => {
    const selectedRowIndex = selectedRows.findIndex(
      (selectedRow) => selectedRow.id === row.id
    );

    if (selectedRowIndex === -1) {
      setSelectedRows([...selectedRows, row]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedRowIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const handleDeleteSelected = () => {
    const updatedRecords = records.filter((row) => !selectedRows.includes(row));
    setRecords(updatedRecords);
    setSelectedRows([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <SearchBar handleFilter={handleFilter} />
      <div className={`table-container ${selectedRows.length > 0 ? "fixed" : ""}`}>
        <DataTable
          currentRecords={currentRecords}
          selectedRows={selectedRows}
          editingRowId={editingRowId}
          editName={editName}
          editEmail={editEmail}
          editRole={editRole}
          handleRowSelected={handleRowSelected}
          handleEdit={handleEdit}
          handleSaveEdit={handleSaveEdit}
          cancelEdit={cancelEdit}
          handleDelete={handleDelete}
          handleEditNameChange={handleEditNameChange}
          handleEditEmailChange={handleEditEmailChange}
          handleEditRoleChange={handleEditRoleChange}
          setSelectedRows={setSelectedRows}
        />
      </div>
      <div className={`selected-actions ${selectedRows.length > 0 ? "fixed" : ""}`}>
        {selectedRows.length > 0 && (
          <>
            <span>{selectedRows.length} rows selected</span>
            <button className="delete-selected-button" onClick={handleDeleteSelected}>
              Delete Selected
            </button>
          </>
        )}
      </div>
      <div className={`pagination-container ${selectedRows.length > 0 ? "fixed" : ""}`}>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={Math.ceil(filterRecords.length / 10)}
          className="pagination-bar"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;