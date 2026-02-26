import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/useContext";
import { toast } from "react-toastify";


const Login = () => {

  const {setUser , loading , setLoading} = useContext(AuthContext)

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setUser(res.data.user)
        navigate('/')
        
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

      setLoading(false)
  };

  
  if(loading){
    return(
      <main>
        <h2 className="loading">Loading...</h2>
      </main>
    )
  }



  return (
    <div className="formContainer">

      <form onSubmit={handleSubmit} className="form">

        <h2>LogIn</h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form_input"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="form_input"
        />

        <button className="formButton">Login</button>
        <p>
          Do not have an account ?
          <Link className="authToggleBtn" to="/signup">
            {" "}
            Create One.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
