import React, { useState, useEffect } from "react";
import axios from "../services/api"; // Import the Axios instance

function UserManagement() {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [newUser, setNewUser] = useState(""); // State for new user name
  const [email, setEmail] = useState(""); // State for new user email
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [editUser, setEditUser] = useState(null); // State for user being edited

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = () => {
    axios
      .get("http://localhost:8001/api/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  // Handle the form submission to add or update a user
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser.trim() === "") {
      alert("User name cannot be empty!");
      return;
    }
    if (email.trim() === "") {
      alert("Email cannot be empty!");
      return;
    }

    const userData = { name: newUser, email: email, is_librarian: false };

    if (editUser) {
      // Update existing user
      axios
        .put(`http://localhost:8001/api/users/${editUser.id}/`, userData)
        .then(() => {
          fetchUsers();
          setNewUser("");
          setEmail("");
          setEditUser(null);
          alert("User updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating the user:", error);
        });
    } else {
      // Add new user
      axios
        .post("http://localhost:8001/api/users/", userData)
        .then((response) => {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          setNewUser("");
          setEmail("");
          alert("User added successfully!");
        })
        .catch((error) => {
          console.error("Error adding the user:", error);
        });
    }
  };

  // Function to delete a user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8001/api/users/${id}/`)
      .then(() => {
        fetchUsers();
        alert("User deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting the user:", error);
      });
  };

  // Function to handle editing a user
  const handleEdit = (user) => {
    setNewUser(user.name);
    setEmail(user.email);
    setEditUser(user);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Management</h2>

      {/* Form to add or update a user */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter user name"
          style={{ flex: 1, padding: "8px" }}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          {editUser ? "Update User" : "Add User"}
        </button>
      </form>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      {/* User List as a Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.email}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                <button onClick={() => handleEdit(user)} style={{ marginRight: "10px", padding: "5px 10px" }}>Edit</button>
                <button onClick={() => handleDelete(user.id)} style={{ padding: "5px 10px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
