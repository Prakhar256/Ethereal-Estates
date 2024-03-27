import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function OAuth() {
  const navigate =useNavigate();
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result= await signInWithPopup(auth, provider);
      const user=result.user;
      
      //checking for the user 
      const docRef=doc(db,"users",user.uid);
      // docRef is the storing the address of user with user particular user id
      const docSnap= await getDoc(docRef);

      // agar user  already exist in database then do nothing otherwise create a new entry 
      if(!docSnap.exists()) {
        await setDoc(docRef, {
          name:user.displayName,
          email:user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
  }
  catch (error) {
      toast.error("Couldn't authorize with  google");
    }
  }
  return (
    <button onClick={onGoogleClick}
      type="button"
      className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
    >
      <FcGoogle className="text-2xl  bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
}
