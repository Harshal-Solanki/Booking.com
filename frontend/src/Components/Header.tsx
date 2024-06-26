import { Link } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = ()=>{

    const {isLoggedIn}= useAppContext();
    return(
        <div className=" bg-blue-800 py-6">
            <div className=" flex justify-around">
                <span className=" text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Booking.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn? <>
                    <Link to="/mybookings" className="flex items-center text-white px-3 font-bold ">My Bookings</Link>
                    <Link to="/myhotel" className="flex items-center text-white px-3 font-bold ">My Hotels</Link>
                    <SignOutButton/>
                    </>
                    :<Link to="/signin" className="bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100">Sign In</Link>
                    }
                </span>
            </div>
        </div>
    )
}

export default Header