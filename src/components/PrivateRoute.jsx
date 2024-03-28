import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if(checkingStatus){
    return <Spinner/>
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
  // agar loggdeIn true hai to app.js me andar wale route pe chala jaayega nhi to navigate to sign-in page
}
