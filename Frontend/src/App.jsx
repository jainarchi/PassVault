import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/useContext";
import { appRouter } from "./AppRoutes";
import { ToastContainer , Bounce } from "react-toastify";

function App() {
  return (
    <>
      <div className="fixed inset-0 -z-10 min-h-[100vh] w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_400px_at_50%_200px,#FFF,transparent)]"></div>
        
      </div>

      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
     
    </>
  );
}

export default App;
