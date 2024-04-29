const express = require("express");
const router = express.Router();
const {getAllBooks, addBook, getBookById, updateBook, deleteBook, deleteAllBooks,} = require("../controllers/book.controller")

router.route("/").get(getAllBooks).post(addBook).delete(deleteAllBooks)
router.route("/:bookId").get(getBookById).patch(updateBook).delete(deleteBook)

module.exports = router