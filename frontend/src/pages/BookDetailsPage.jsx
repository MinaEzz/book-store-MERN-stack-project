import { useEffect, useState } from "react"
import { BackButton, Spinner } from "../components"
import axios from "axios"
import {useParams} from "react-router-dom"

const BookDetailsPage = () => {
  const {bookId} =  useParams()
  const [book, setBook] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  useEffect(()=>{
    setIsLoading(true)
    axios.get(`http://localhost:5001/api/books/${bookId}`)
    .then((response)=>{
      setBook(response.data.data.book)
      setIsLoading(false)
    })
    .catch((error)=>{
      setError(error.message)
      console.log(error.message)
      setIsLoading(false)
    })
  }, [])
  return (
    <section className="p-4">
      <BackButton />
      <h2 className="text-3xl my-4 ">Show Book</h2>
      {
        isLoading ? 
        (
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        )
        :
        (
          book ?
          (
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full p-4">
              <div className="my-4">
                  <span className="text-xl mr-4 text-gray-500">Id</span>
                  <span> {book._id} </span>
              </div>
              <div className="my-4">
                  <span className="text-xl mr-4 text-gray-500">Title</span>
                  <span> {book.title} </span>
              </div>
              <div className="my-4">
                  <span className="text-xl mr-4 text-gray-500">Author</span>
                  <span> {book.author} </span>
              </div>
              <div className="my-4">
                  <span className="text-xl mr-4 text-gray-500">Publish Year</span>
                  <span> {book.publishYear} </span>
              </div>
              <div className="my-4">
                  <span className="text-xl mr-4 text-gray-500">Create Time</span>
                  <span> {new Date(book.createdAt).toLocaleDateString()} </span>
              </div>
              <div className="my-4">
                  <span className="text-xl mr-4 text-gray-500">Last Update </span>
                  <span> {new Date(book.updatedAt).toLocaleDateString()} </span>
              </div>
            </div>
          ) 
          : 
          (
            <h2> {error} </h2>
          )
        )
      }
    </section>
  )
}

export default BookDetailsPage