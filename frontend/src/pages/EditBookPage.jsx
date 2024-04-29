import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner, BackButton } from "../components";
import { useSnackbar } from "notistack";

const EditBookPage = () => {
  const { bookId } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/books/${bookId}`)
      .then((response) => {
        setTitle(response.data.data.book.title);
        setAuthor(response.data.data.book.author);
        setPublishYear(response.data.data.book.publishYear);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.message);
        console.log(error.message);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .patch(`http://localhost:5001/api/books/${bookId}`, data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Book Updated Successfully", { variant: "success" });
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
      <h2 className="text-3xl my-4 ">Edit Book</h2>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <form
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] mx-auto p-4"
        action="/"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="my-4">
          <label className="text-xl text-gray-500" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-500" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-500" htmlFor="publishYear">
            Publish Year
          </label>
          <input
            type="Number"
            name="publishYear"
            id="publishYear"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button type="submit" className="p-2 bg-sky-300 w-full font-bold">
          Edit Book
        </button>
      </form>
    </section>
  );
};

export default EditBookPage;
