import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BlogContext from "./Context/BlogContex";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
]);

function App() {
  return (
    <>
      <BlogContext>
        <RouterProvider router={router}></RouterProvider>
      </BlogContext>
    </>
  );
}

export default App;
