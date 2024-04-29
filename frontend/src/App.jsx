import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {HomePage, CreateBookPage, EditBookPage, BookDetailsPage, DeleteBookPage} from "./pages"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/create" element={<CreateBookPage />} />
        <Route path="/books/bookDetails/:bookId" element={<BookDetailsPage />} />
        <Route path="/books/edit/:bookId" element={<EditBookPage />} />
        <Route path="/books/delete/:bookId" element={<DeleteBookPage />} />
      </Routes>
    </Router>
  )
}

export default App