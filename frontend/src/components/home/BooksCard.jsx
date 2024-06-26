import { Link } from "react-router-dom";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";
import { useState } from "react";

const BooksCard = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => {
        return (
          <div
            key={book._id}
            className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 hover:shadow-xl relative"
          >
            <p className=" absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg ">
              {book.publishYear}
            </p>
            <p className="my-2 text-gray-500">{book._id}</p>
            <div className="flex justify-start items-center gap-2 ">
              <PiBookOpenTextLight className="text-red-300 text-2xl" />
              <h3 className="my-1">{book.title}</h3>
            </div>
            <div className="flex justify-start items-center gap-2">
              <BiUserCircle className="text-red-300 text-2xl" />
              <h3 className="my-1">{book.author}</h3>
            </div>
            <div className="flex justify-between items-center gap-2 mt-4 p-4">
              <BiShow
                className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                onClick={() => setShowModal(true)}
              />
              <Link to={`/books/bookDetails/${book._id}`}>
                <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
              </Link>
            </div>
            {showModal && <BookModal book={book} onClose={onClose} />}
          </div>
        );
      })}
    </div>
  );
};

export default BooksCard;
