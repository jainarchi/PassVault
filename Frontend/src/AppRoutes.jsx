import { createBrowserRouter } from "react-router-dom";
import ManagePassword from "./pages/ManagePassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


export const appRouter = createBrowserRouter([
  {
    path: '/',
    element : <Home />
  },
  {
    path: '/login',
    element : <Login />
  },
  {
    path : '/signup',
    element: <SignUp />
  },
  {
    path: '/managepassword',
    element : <ManagePassword />
  }
])

