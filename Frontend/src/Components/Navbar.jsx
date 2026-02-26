import Logo from "./Logo.jsx";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../Context/useContext.jsx";
import axios from "axios";
import { RiUser3Fill , RiLogoutCircleRLine , RiUserLine , RiMailLine } from "@remixicon/react";



const Navbar = () => {
  const { user , setUser } = useContext(AuthContext);
  const showUserInfo = useRef()

  const handleLogout = async () =>{
     axios.post('http://localhost:3000/api/auth/logout' , 
        {} ,
      {
        withCredential: true
     })
     .then(() =>{
        console.log('logout successfully')
        setUser(null)
       
     })
  }


  const toggleUserInfo = () =>{
      if(showUserInfo.current.classList.contains('hidden')){
        showUserInfo.current.classList.remove('hidden')
      }
      else showUserInfo.current.classList.add('hidden')
  }



  return (
    <nav className=" bg-gray-700">
      <div className="flex justify-between items-center mx-auto max-w-4xl py-3 px-2">
        <Logo textSize="xl" color="white" />

        <ul className="flex gap-4 md:gap-6  text-white items-center ">
          {!user ? (
            <>
              <li>
                <button>
                  <Link className="font-semibold" to="/">
                    Home
                  </Link>
                </button>
              </li>
              <li>
                <button>
                  <Link className="font-semibold" to="/login">
                    Log In
                  </Link>
                </button>
              </li>
              <li>
                <button>
                  <Link className="font-semibold" to="/signup">
                    Sign Up
                  </Link>
                </button>
              </li>
            </>
          ) : (
            <>
           
           <div className="navleft">

              <div className="userInfo " ref={showUserInfo}>
                  <div>
                    <RiUserLine className="size-[18px] text-green-600 "/>
                   <span>{user.name}</span>
                    </div>
                  <div>
                    <RiMailLine className="size-[18px] text-green-600" />
                    <span>{user.email}</span>
                    </div>

              </div>


              <li>
                <button className="profileBtn" onClick={toggleUserInfo}>
                   <RiUser3Fill  className="profileIcon size-[20px] cursor-pointer"/>         
                </button>
              </li>
              <li>
                <button
                   onClick={handleLogout}
                   className="pt-2"
                  >
                   <RiLogoutCircleRLine  className="size-[24px] cursor-pointer"/>
                
                </button>
              </li>

              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
