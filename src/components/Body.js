import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import {  } from "../utils/userSlice";
import { auth } from "../utils/firebase"

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
          path: "/",
          element : <Login/>
        },
        {
          path: "/browse",
          element: <Browse />
        }
      ]);

      useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const {uid, email, displayName } = user;
            dispatch(addUser({ uid:uid, email: email, displayName: displayName}));
          } else {
            dispatch(removeUser());
          }
        })
      },[]);

    return <div>
     <div>
        <RouterProvider router={appRouter} />

        
     </div>
    </div>
};

export default Body;