import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute z-10 py-2 px-8 w-screen flex flex-col md:flex-row justify-between bg-gradient-to-b from-black">
      <img className="w-44 brightness-125 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && <div className="flex p-2 justify-between">
        {showGptSearch && <select onChange={handleLanguageChange} className="p-2 bg-gray-500 text-white m-2 rounded-lg">
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button onClick={handleGptSearchClick} className="py-2 px-4 m-2 bg-purple-800 text-white rounded-lg mx-4">{showGptSearch ? "Homepage" : "GPT Search"}</button>
        <img className="w-12 h-12 m-2 hidden md:inline-block rounded-lg" src={user?.photoURL} alt="userIcon" />
        <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
      </div>}
    </div>
  )
};

export default Header;