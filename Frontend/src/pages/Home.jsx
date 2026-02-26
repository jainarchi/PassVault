import { cardData } from "../utils/cardData";
import Logo from '../Components/Logo'
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer'
import { useContext } from "react";
import { AuthContext } from "../Context/useContext";



const Home = () => {
  const{user} = useContext(AuthContext)

  return (
    <div>
      <Navbar />

      <main className="min-h-[93vh] ">
      
        <div className="h-[60vh]  flex flex-col gap-4 justify-center items-center text-center">
          <h1 className=""><Logo  textSize='4xl' color='black'/></h1>
          <h1 className="text-4xl md:text-6xl font-bold ">Secure Your Digital Life.</h1>

          <h3 className="text-xl md:text-xl text-green-800 p-4">
            The Safest way to manage and store your Passwords
          </h3>

          <button className="px-4 py-2 text-black bg-green-400 mt-10 rounded-md">
           <Link 
           
           to= {user ? '/managepassword' : '/signup'}
           
           >GET STARTED FOR FREE</Link> 
          </button>
        </div>

        {/* cards  */}

        
        <div className=" md:flex max-w-[800px] m-auto justify-center items-center flex-wrap py-4 ">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className=" border border-green-400 w-82 md:w-90 h-58 p-4 m-4 "
            >
              <div className="flex items-center gap-4 mb-4 ">
                <span className="bg-green-100 p-2 rounded-md ">{card.icon}</span>
                <h3 className="text-2xl font-semibold">{card.title}</h3>
              </div>
              <p className="text-[17px]">{card.desp}</p>
            </div>
          ))}
        </div>



       
      </main>
       <Footer />
    </div>
  );
};

export default Home;
