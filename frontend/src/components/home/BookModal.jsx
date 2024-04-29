import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-10 z-10 top-0 bottom-0 right-0 left-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[600px] h-[400px] max-w-full bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose
          className=" absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <p className="w-fit px-4 py-1 bg-red-300 rounded-lg ">
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
        <p className="my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sequi
          quasi veritatis iusto nam distinctio nihil tempora explicabo
          voluptates, quas commodi, rerum corrupti praesentium. Corrupti
          obcaecati facilis cum id modi.
        </p>
      </div>
    </div>
  );
};

export default BookModal;
