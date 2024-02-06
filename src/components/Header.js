import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const handleSignOut = ()=>{
        signOut(auth)
        .then(() => {
        }).catch((error) => {
            navigate("/error");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
              })
            );
            navigate("/browse");
          } else {
            dispatch(removeUser());
            navigate("/");
          }
        });
    
        // Unsiubscribe when component unmounts
        return () => unsubscribe();
      }, []);

    return ( <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
        <img className="w-48 h-18" 
        src={LOGO}
        alt="Logoicon" />
       { user && <div className="flex p-4">
       <img className="w-10 h-12" 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9-KCL7l0vsf7Mv6L6w2DgP8djSOu9yk1-tg&usqp=CAU"
        alt="usericon" />
        <button onClick={handleSignOut} className="font-bold text-white"> Sign Out</button>
        </div> }
    </div>
    )
};

export default Header;