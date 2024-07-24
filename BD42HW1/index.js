const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD42HW1/books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

// books

async function getAllBooks() {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
}
app.get("/books", async (req, res) => {
  try {
    let result = await getAllBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: "Books not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// books/author/:author
async function getAllBooksByAuthor(author) {
  let query = "SELECT * FROM books WHERE author = ?";
  let response = await db.all(query, [author]);
  return { books: response };
}
app.get("/books/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let result = await getAllBooksByAuthor(author);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "Book author not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// books/genre/:genre
async function getAllBooksByGenre(genre) {
  let query = "SELECT * FROM books WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { books: response };
}
app.get("/books/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await getAllBooksByGenre(genre);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "Books author not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// books/publication_year/:year
async function getAllBooksByPublicationYear(publication_year) {
  let query = "SELECT * FROM books WHERE publication_year = ?";
  let response = await db.all(query, [publication_year]);
  return { books: response };
}
app.get("/books/publication_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let result = await getAllBooksByPublicationYear(year);
    if (result.books.length === 0) {
      return res
        .status(404)
        .json({ message: "Books publication year not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
