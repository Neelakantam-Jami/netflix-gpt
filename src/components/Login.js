import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG, USER_PHOTO } from "../utils/constants";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        const msg = checkValidData(email.current.value, password.current.value);
        setErrorMsg(msg);
        if (msg) return;

        if (!isSignInForm) {
            //Sign Up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name.current.value, photoURL:USER_PHOTO,
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL:photoURL }));
                  }).catch((error) => {
                    setErrorMsg(error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(errorCode + "-" + errorMessage);
            });
        } else {
            //Sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(errorCode + "-" + errorMessage);
            });
        }
    }

    return (
        <div className="relative h-screen">
            <Header />
            <form onSubmit={(e)=>e.preventDefault()} className="bg-black absolute w-5/6 md:w-1/4 p-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white rounded-lg bg-opacity-70">
                <h1 className="font-bold text-3xl py-4">{isSignInForm?"Sign In":"Sign Up"}</h1>
                {!isSignInForm && <input ref={name} type="text" placeholder="Full name" className="p-2 my-4 w-full bg-gray-700" />}
                <input ref={email} type="text" placeholder="Email or mobile number" className="p-2 my-4 w-full bg-gray-700"/>
                <input ref={password} type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-700"/>
                <p className="text-red-600 font-bold py-2">{errorMsg}</p>
                <button className="p-2 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="my-4 cursor-pointer" onClick={handleSignInForm}>{isSignInForm?(<span> New to Netflix? <b className="hover:underline">Sign up now.</b></span>):(<span className="text-xs"> Already have an account? <b className="hover:underline">Sign in now.</b></span>)}</p>
            </form>
            <img className="brightness-50 h-full md:w-full object-cover" src={BG_IMG} alt="background_image" />
        </div>
    )
}

export default Login;