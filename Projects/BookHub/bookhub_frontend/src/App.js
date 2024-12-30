import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import the toast components
import UserManagement from "./components/UserManagement/UserManagement";
import CatalogManagement from "./components/CatalogManagement/CatalogManagement";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/users">User Management</Link> |{" "}
        <Link to="/catalog">Catalog Management</Link>
      </nav>
      <Routes>
        <Route path="/users" element={<UserManagement />} />
        <Route path="/catalog" element={<CatalogManagement />} />
      </Routes>
      {/* Toast Notifications Container */}
      <ToastContainer />
    </Router>
  );
}

export default App;