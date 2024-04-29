import { BackButton, Spinner } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";
const CreateBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, author, publishYear };
    axios
      .post("http://localhost:5001/api/books", data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Book Created Succefully", { variant: "success" });
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
      <h2 className="text-3xl my-4 ">Create Book</h2>
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
          Save
        </button>
      </form>
    </section>
  );
};

export default CreateBookPage;
