const book = require("../models/book.model")
const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText")

// Get All Books
const getAllBooks = async (req, res)=> {
    try {
        const books = await book.find()
        if(!books){
            return res.status(404).json({status: FAIL, data: null})
          }
          res.status(200).json({status: SUCCESS,data: {books}})
    } catch (error) {
        res.status(400)
        .json({status: ERROR, data: null ,msg: `Can Not Get Courses: ${error.message}`, code: 400})
    }
}

// Add Course
const addBook = async (req, res)=> {
    const body = req.body
    try {
        if(!body) {
            return res.status(400).json({status: FAIL, data: null, msg: "Send All Required Fields: title, author, publishYear"})
        }
        const newBook = new book(body)
        await newBook.save()
        res.status(201).json({status: SUCCESS, data:{book: newBook}})
    } catch (error) {
        res.status(500).json({status:ERROR, data: null, msg: `Faild To Add Book: ${error.message}` , code: 500})
    }
}

// Get Book By Id
const getBookById = async (req, res)=> {
    const { bookId } = req.params
    try {
        const matchedBook = await book.findById(bookId)
        if(!matchedBook) {
            return res.status(404).json({status: FAIL, data: null, msg: "Book Not Found"})
        }
        res.status(200).json({status: SUCCESS, data: {book: matchedBook}});
    } catch (error) {
        res.status(400)
        .json({status: ERROR, data: null, msg: `invalid object ID: ${error.message}`, code: 400})
    }
}

// Update Book
const updateBook = async (req, res)=> {
    const { bookId } = req.params
    const body = req.body
    try {
        const updatedBook = await book.findByIdAndUpdate(bookId, body)
        if(!updatedBook) {
            return res.status(404).json({status: FAIL, data: null, msg: "Book Not Found"})
        }
        return res.status(200).json({status:SUCCESS, data: {book: updatedBook}});
    } catch (error) {
        res.status(400).json({status:ERROR, data: null, msg: `Failed To Update: ${error.message}`, code: 400}) 
    }
}

// Delete Book
const deleteBook = async (req, res)=> {
    const {bookId} = req.params
    try {
        await book.deleteOne({_id: bookId})
        res.status(200).json({status:  SUCCESS, data: null});
    } catch (error) {
        res.status(400).json({status:ERROR, data: null, msg: `Failed To Delete: ${error.message}`, code: 400})
    }
}

// Delete All Books
const deleteAllBooks = async (req, res)=> {
    try {
        await book.deleteMany()
        res.status(200).json({ status:SUCCESS, data: null});
    } catch (error) {
        res.status(400).json({status: ERROR, data: null, msg: error.message, code: 400})
    }
}

module.exports = { getAllBooks, addBook, getBookById, updateBook, deleteBook, deleteAllBooks}