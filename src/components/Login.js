import { useState } from "react";
import Header from "./Header";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm =() =>{
        setIsSignInForm(!isSignInForm);

    }
    return (
    <div>
        <Header/>
        <div className="absolute">
        <img 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/IN-en-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="BG" />
        </div>
        <form className="w-3/12 absolute bg-opacity-80 p-12 bg-black my-36 mx-auto right-0 left-0 text-white">
         <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1> 
         {(!isSignInForm)  && <input type="text" placeholder="Full Name" className=" p-2 my-4 w-full rounded-lg"/> }
         <input type="text" placeholder="Enter Address" className=" p-2 my-4 w-full rounded-lg" />
         <input type="password" placeholder="Enter Email Address" className=" p-2 my-4 w-full rounded-lg" />
         <button className="p-2 my-4 bg-slate-500 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
         <p className="cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign up now" : "Already registered? sign In now "}</p>
        </form>
    </div>

    );
};

export default Login;
