import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";

import { HomePage } from "./features/HomePage";
import { ErrorPage } from "./features/ErrorPage";
import { SignInPage } from "./features/AuthPages/SignInPage";
import { SignUpPage } from "./features/AuthPages/SignUpPage";
import {XRayPage} from "./features/XRayPage/XRayPage";
import {Layout} from "./components/Layout/Layout";
import {getUserById} from "./api/users/getUserById";
import {jwtDecode} from "jwt-decode";
import {getMyPermissions} from "./api/users/getMyPermissions";
import {Permission} from "./constants";
import {validatePermissions} from "./utils/validatePermissions";


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
        },
        {
          path: "/messages",
          element: <>Messages</>
        },
        {
          path: "/appointments",
          element: <>Create appointment</>
        },
        {
          path: "/users",
          loader: async () => {
            const canViewUsers = await validatePermissions([Permission.viewUsers]);
            if (!canViewUsers) {
              throw new Response("Forbidden", { status: 403 });
            }
            return null;
          },
          children: [
            {
              path: '/users',
              element: <>Users</>,
            },
            {
              path: '/users/create-doctor',
              element: <>Create doctor page</>
            }
          ]
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
