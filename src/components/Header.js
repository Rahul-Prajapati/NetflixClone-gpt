import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

      const handleGptSearchClick = () => {
        // Toggle GPT Search
        dispatch(toggleGptSearchView());
      };
    
      const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
      };
    

    return ( <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
        <img className="w-48 h-18" 
        src={LOGO}
        alt="Logoicon" />
       { user && <div className="flex p-4">

       {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

       <img className="w-10 h-12" 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9-KCL7l0vsf7Mv6L6w2DgP8djSOu9yk1-tg&usqp=CAU"
        alt="usericon" />
        <button onClick={handleSignOut} className="font-bold text-white"> Sign Out</button>
        </div> }
    </div>
    )
};

export default Header;