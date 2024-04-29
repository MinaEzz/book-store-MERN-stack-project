import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner, BooksTable, BooksCard } from "../components";
import { MdOutlineAddBox } from "react-icons/md";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5001/api/books")
      .then((response) => {
        setBooks(response.data.data.books);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);
  return (
    <section className="p-4 ">
      <div className="flex justify-center items-center gap-4">
        <button
          className="bg-sky-300 hover:bg-sky-500 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-500 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 capitalize">books list</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : books.length > 0 ? (
        showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )
      ) : (
        <h2 className="text-center text-2xl"> {error} </h2>
      )}
    </section>
  );
};

export default HomePage;
