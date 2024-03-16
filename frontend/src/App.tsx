import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";

import { HomePage } from "./features/HomePage";
import { ErrorPage } from "./features/ErrorPage";
import { SignInPage } from "./features/AuthPages/SignInPage";
import { SignUpPage } from "./features/AuthPages/SignUpPage";
import {XRayPage} from "./features/XRayPage/XRayPage";
import {Layout} from "./components/Layout/Layout";
import {Permission} from "./constants";
import {
  createValidatePermissionsLoader
} from "./utils/validatePermissions";
import {MessagesPage} from "./features/MessagesPage";
import {AppointmentsPage} from "./features/AppointmentsPage/AppointmentsPage";
import {CreateDoctorPage} from "./features/AuthPages/CreateDoctorPage";
import {NotificationsProvider} from "./contexts/NotificationsContext";
import {UserInfoProvider} from "./contexts/UserInfoContext";


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
          loader: createValidatePermissionsLoader([Permission.useXrayAnalysis]),
          element: <XRayPage />,
        },
        {
          path: "/messages",
          element: <MessagesPage />
        },
        {
          path: "/appointments",
          element: <AppointmentsPage />
        },
        {
          path: "/users",
          loader: createValidatePermissionsLoader([Permission.viewUsers]),
          children: [
            {
              path: '/users',
              element: <>Users</>,
            },
            {
              path: '/users/create-doctor',
              loader: createValidatePermissionsLoader([Permission.editUsers]),
              element: <CreateDoctorPage />
            }
          ]
        }
      ]
    },
  ]);

  return (
    <div className="App">
      <NotificationsProvider>
        <UserInfoProvider>
          <RouterProvider router={router} />
        </UserInfoProvider>
      </NotificationsProvider>
    </div>
  );
}

export default App;
