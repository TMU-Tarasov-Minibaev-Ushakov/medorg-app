import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./features/HomePage/HomePage";
import { ErrorPage } from "./features/ErrorPage.tsx";
import { SignInPage } from "./features/AuthPages/SignInPage";
import { SignUpPage } from "./features/AuthPages/SignUpPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
