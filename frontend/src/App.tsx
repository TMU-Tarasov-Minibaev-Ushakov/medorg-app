import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./features/HomePage/HomePage";
import { ErrorPage } from "./features/ErrorPage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/sign-in",
      element: <>Sign in</>,
    },
    {
      path: "/sign-up",
      element: <>Sign up</>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
