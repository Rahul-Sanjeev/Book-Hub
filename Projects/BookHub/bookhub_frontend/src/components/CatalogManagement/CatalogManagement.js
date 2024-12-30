import React, { useState, useEffect } from "react";
import axios from "../services/api"; // Import the Axios instance

import { toast } from "react-toastify"; // Import the toast components
import "react-toastify/dist/ReactToastify.css"; // Import the required CSS

function CatalogManagement() {
  // State Management
  const [books, setBooks] = useState([]); // State to store the list of books
  const [newBook, setNewBook] = useState(""); // State to store the new book title
  const [author, setAuthor] = useState(""); // State to store the new book author
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books from the API
  const fetchBooks = () => {
    axios
      .get("http://localhost:8000/api/books/")
      .then((response) => {
        setBooks(response.data); // Update the state with fetched books
      })
      .catch((error) => {
        console.error("Error fetching books:", error);

        toast.error("Error fetching books. Please try again."); // Show error toast
      });
  };

  // Function to generate a random 13-digit number (ISBN)
  const generateRandom13DigitNumber = () => {
    let randomNumber = "";
    for (let i = 0; i < 13; i++) {
      randomNumber += Math.floor(Math.random() * 10); // Generate a random digit
    }
    return randomNumber;
  };

  // Handle the form submission to add a book
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (newBook.trim() === "") {
      toast.error("Book title cannot be empty!"); // Error toast
      return;
    }
    if (author.trim() === "") {
      toast.error("Author name cannot be empty!"); // Error toast
      return;
    }

    const randomISBN = generateRandom13DigitNumber();
    const bookData = {
      title: newBook,
      author: author,
      isbn: randomISBN,
    };

    // Axios POST request to add a new book
    axios
      .post("http://localhost:8000/api/books/", bookData)
      .then(() => {
        setNewBook(""); // Clear the book title input field
        setAuthor(""); // Clear the author input field
        fetchBooks(); // Refresh the book list
        toast.success("Book added successfully!", {
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        }); // Success toast
      })
      .catch((error) => {
        console.error("Error adding the book:", error);
        toast.error("Error adding the book. Please try again."); // Error toast
      });
  };

  // Function to delete a book
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/books/${id}/`)
      .then(() => {
        fetchBooks(); // Refresh the book list
        toast.success("Book deleted successfully!"); // Success toast
      })
      .catch((error) => {
        console.error("Error deleting the book:", error);
        toast.error("Error deleting the book. Please try again."); // Error toast
      });
  };

  // Function to filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Catalog Management</h2>

      {/* Form for adding a new book */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="form-group">
          <input
            type="text"
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
            placeholder="Enter book title"
            className="form-control mb-2"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            className="form-control mb-2"
            style={{ flex: 1, padding: "8px" }}
          />


        </div>
        <button type="submit" style={{ padding: "8px 16px", backgroundColor: "green", color: "white", }} className="btn btn-primary">
          Add Book
        </button>
      </form>

      {/* Search Bar */}
      <div className="form-group mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books by title"
          className="form-control"
        />
      </div>





      {/* User List as a Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Auhor</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>ISBN</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.id}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.title}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.author}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.isbn}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                <button onClick={() => handleDelete(book.id)} style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "red", color: "white" }}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}

export default CatalogManagement;
