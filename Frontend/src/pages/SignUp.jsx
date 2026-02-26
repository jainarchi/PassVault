import { useState } from "react"
import axios from 'axios'
import { Link , useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../Context/useContext"
import { toast } from "react-toastify"



const SignUp = () => {
  const {setUser , loading , setLoading} = useContext(AuthContext)


  const [form, setForm] = useState({
     fullname : "",
     email : "",
     password : "",
   
  })

  const navigate = useNavigate()
 

  const handleChange = (e) =>{
     setForm({...form, [e.target.name]: e.target.value  } )
  }



  const submitForm = (e) =>{
   e.preventDefault()
   setLoading(true)

   axios.post('http://localhost:3000/api/auth/register' , {
      name: form.fullname,
      email : form.email,
      password : form.password
   },{
    withCredentials : true
   })
   .then((res) =>{
    // console.log(res.data.message)
    setUser(res.data.user)
    navigate('/')
 
   })
   .catch((err) =>{
    toast.error(err.response.data.message)
   })

    setLoading(false)

  }


  if(loading){
    return(
      <main>
        <h2  className="loading">Loading...</h2>
      </main>
    )
  }

  return (
    <div className="formContainer" >

        <form onSubmit={submitForm}
        className="form"
        >
          <h2>Create Account</h2>

          <input type="text" 
          placeholder='Full Name'
          name = 'fullname'
          value={form.fullname}
          onChange={handleChange}
          className="form_input"
          
          />

          <input type="email" 
          placeholder='Email'
          name='email'
          value={form.email}
          onChange={handleChange}
           className="form_input"
          />

          <input type="password" 
          placeholder='Password'
          name='password'
          value={form.password}
          onChange={handleChange}
           className="form_input"
          />

          {/* <input type="password" 
          placeholder='Confirm password'
          name='confirmPassword'
          value={form.confimPassword}
          onChange={handleChange}
          className="form_input"
          
          /> */}

          <button className="formButton">Sign Up</button>


          <p>Already have an account ? 
            <Link className="authToggleBtn" to='/login'> Login</Link>
          </p>




        </form>
      
    </div>
  )
}

export default SignUp
