import {auth, provider} from '../config/firebase'
import { signInWithPopup } from "firebase/auth"
import { useNavigate, Navigate } from "react-router-dom"
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { FcGoogle } from "react-icons/fc";
import Lottie from 'lottie-web';
import book from './bookjson.json'
import img from '../Untitled design.png'
import {motion} from "framer-motion"
export const Auth = () =>{
    const navigate = useNavigate();

    const { isAuth } = useGetUserInfo();


    const signInWithGoogle = async () =>{
        const results = await signInWithPopup(auth, provider);
        console.log(results)
        const authInfo = {
            userId: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("expense-tracker");
    };


    if(isAuth){
        return <Navigate to="expense-tracker" />
    }





    return (<div className='flex flex-col items-center justify-center h-screen bg-gray-900'>

<header className="fixed top-0 w-full text-center bg-white shadow-lg p-1 flex flex-row items-center md:flex-row md:p-4">
  <img
    className="h-16 w-auto rounded-full border-2 border-gray-300 shadow-lg md:mb-0"
    src={img}
    alt="logo"
  />
  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">VGrow</h1>
</header>
{/* <Lottie animationData={book}></Lottie> */}


<div className='flex flex-col items-center'>
<motion.h1 
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
          staggerDirection: 1 // 1 for forward, -1 for backward
        }
      }}
      className="text-8xl font-bold text-gray-500 mb-4"
    >
      <motion.h1 
        initial={{ x: 100, opacity: 0.8 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 1.24 } }}
      >
        Your
      </motion.h1>
      <motion.h1 
        initial={{ x: 100, opacity: 0.7 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 1.24 } }}
      >
        Own
      </motion.h1>
      <motion.h1 
        initial={{ x: 0, opacity: 0.6 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 1.24 } }}
      >
        Personal
      </motion.h1>
      <motion.h1 
        initial={{ x: -100, opacity: 0.7 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 1.24 } }}
      >
        Expense
      </motion.h1>
      <motion.h1 
        initial={{ x: -100, opacity: 0.7 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 1.24 } }}
      >
        Tracker
      </motion.h1>
    </motion.h1>
{/* Your Own Personal Expense Tracker */}
{/* {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
} */}





      <p className="text-white text-lg mb-4">Sign in with Google to continue...</p>
      <button
        className="bg-white text-teal-900 px-4 py-2 rounded shadow hover:bg-teal-100 transition duration-300 flex justify-center items-center"
        onClick={signInWithGoogle}
      >
        <FcGoogle className='flex items-center justify-center'/> Sign In with Google
      </button>
    </div>
</div>
    )
}   

// bg-gradient-to-t at-10-20 from-teal-500 via-teal-400 to-teal-300