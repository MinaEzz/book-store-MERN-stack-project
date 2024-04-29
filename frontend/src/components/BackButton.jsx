import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
const BackButton = ({destination = "/"}) => {
  return (
    <button className="flex">
        <Link 
        to={destination}
        className="bg-sky-800 text-white px-4 rounded-lg w-fit"
        >
            <BsArrowLeft className="text-2xl" />
        </Link>
    </button>
  )
}

export default BackButton