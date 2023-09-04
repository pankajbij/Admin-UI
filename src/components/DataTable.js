import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function DataTable({
  currentRecords,
  selectedRows,
  editingRowId,
  editName,
  editEmail,
  editRole,
  handleRowSelected,
  handleEdit,
  handleSaveEdit,
  cancelEdit,
  handleDelete,
  handleEditNameChange,
  handleEditEmailChange,
  handleEditRoleChange,
  setSelectedRows
}) {
  const allRowsSelected = selectedRows.length === currentRecords.length;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={!allRowsSelected && selectedRows.length > 0}
                checked={allRowsSelected}
                onChange={() => {
                  if (allRowsSelected) {
                    setSelectedRows([]);
                  } else {
                    setSelectedRows([...currentRecords]);
                  }
                }}
                className={allRowsSelected ? "header-checkbox" : ""}
              />
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>Name</TableCell>
            <TableCell sx={{ fontSize: "20px" }}>Email</TableCell>
            <TableCell sx={{ fontSize: "20px" }}>Role</TableCell>
            <TableCell sx={{ fontSize: "20px" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRecords.map((row) => (
            <TableRow
              key={row.id}
              style={{
                cursor: "pointer",
                backgroundColor: selectedRows.includes(row)
                  ? "#E2E5DE"
                  : "white"
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRows.includes(row)}
                  onClick={() => handleRowSelected(row)}
                />
              </TableCell>
              <TableCell>
                {row.id === editingRowId ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => handleEditNameChange(e.target.value)}
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                {row.id === editingRowId ? (
                  <input
                    type="text"
                    value={editEmail}
                    onChange={(e) => handleEditEmailChange(e.target.value)}
                  />
                ) : (
                  row.email
                )}
              </TableCell>
              <TableCell>
                {row.id === editingRowId ? (
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => handleEditRoleChange(e.target.value)}
                  />
                ) : (
                  row.role
                )}
              </TableCell>
              <TableCell>
                {row.id === editingRowId ? (
                  <>
                    <button
                      className={`action-button edit-button ${
                        editingRowId ? "" : "disabled"
                      }`}
                      onClick={() => handleSaveEdit(row)}
                    >
                      Save
                    </button>
                    <button
                      className="action-button"
                      onClick={() => cancelEdit()}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`action-button edit-button ${
                        editingRowId ? "disabled" : ""
                      }`}
                      onClick={() => handleEdit(row)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className={`action-button delete-button ${
                        editingRowId ? "disabled" : ""
                      }`}
                      onClick={() => handleDelete(row)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
