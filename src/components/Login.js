import { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/valiadate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";
const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errMessage, seterrMessage] = useState("");
    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const dispatch = useDispatch();



    const toggleSignInForm =() =>{
        setIsSignInForm(!isSignInForm);

    }

    const handlebutton = () =>{
       const message = validateData(email.current.value, password.current.value);

       seterrMessage(message);

       if(message) return errMessage;

       if (!isSignInForm) {
          // sign Up Logic

          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            updateProfile(user, {
                displayName : fullName.current.value,
            }).then(()=> {
                const { uid, email, displayName} = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                  })
                );
            }).catch((error) => {
                seterrMessage(error.message);
            });
            console.log(user);
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrMessage(errorCode + "-" +  errMessage);
            });
       } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
        })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrMessage(errorCode + "-" + errMessage);
        });
          // sign In Logic
       }
    }

    return (
    <div>
        <Header/>
        <div className="absolute">
        <img src={BG_URL} alt="logo" />
        </div>

        <form onSubmit={
            (e)=> e.preventDefault()} 
             className="w-3/12 absolute bg-opacity-80 p-12 bg-black my-36 mx-auto right-0 left-0 text-white">
         <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}</h1> 
         {(!isSignInForm)
           && 
           <input 
           ref={fullName} 
           type="text" 
           placeholder="Enter Full Name" 
           className=" p-2 my-4 bg-gray-700 w-full rounded-lg"/> }
         <input 
         ref={email}
         type="text" 
         placeholder="Enter Email Address" 
         className=" p-2 my-4 bg-gray-700 w-full rounded-lg" />

         <input 
         ref={password}
         type="password" 
         placeholder="Enter Password" 
         className=" p-2 my-4 bg-gray-700 w-full rounded-lg" />

         <button 
         className="p-2 my-4 bg-gray-700 w-full rounded-lg" onClick={handlebutton}>
            {isSignInForm ? "Sign In" : "Sign Up"}
         </button>
         <p className="text-red-500">{errMessage}</p>

         <p className="cursor-pointer" 
         onClick={toggleSignInForm}> 
         {isSignInForm ? "New to Netflix? Sign up now" : "Already registered? sign In now "}
         </p>

        </form>
        </div>

    );
};

export default Login;
