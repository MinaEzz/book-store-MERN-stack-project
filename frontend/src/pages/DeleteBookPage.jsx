import { Spinner, BackButton } from "../components";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBookPage = () => {
  const { bookId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5001/api/books/${bookId}`)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Succefully Deleted", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };
  return (
    <section className="p-4">
      <BackButton />
      <h2 className="text-3xl my-4 ">Delete Book</h2>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="flex flex-col items-center  border-2 border-sky-400 rounded-xl w-[600px] m-auto p-8">
        <h3 className="text-2xl text-center">
          Are You Sure You Want To Delete This Book?
        </h3>
        <button
          className="bg-red-600 p-4 text-white w-full m-4"
          onClick={handleDelete}
        >
          Yes, Delete It
        </button>
      </div>
    </section>
  );
};

export default DeleteBookPage;
