import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
