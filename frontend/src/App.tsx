import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";

import { HomePage } from "./features/HomePage/HomePage";
import { ErrorPage } from "./features/ErrorPage";
import { SignInPage } from "./features/AuthPages/SignInPage";
import { SignUpPage } from "./features/AuthPages/SignUpPage";
import {XRayPage} from "./features/XRayPage/XRayPage";
import {Layout} from "./components/Layout/Layout";


function App() {
  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      loader: () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          return redirect("/sign-in");
        }
        return null;
      },
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/x-ray",
          element: <XRayPage />,
        }
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
