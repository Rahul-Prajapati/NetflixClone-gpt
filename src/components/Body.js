import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Broswe from "./Browse";
import Login from "./Login";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
          path: "/",
          element : <Login/>
        },
        {
          path: "/browse",
          element: <Broswe />
        }
      ])

    return <div>
     <div>
        <RouterProvider router={appRouter}>

        </RouterProvider>
     </div>
    </div>
};

export default Body;