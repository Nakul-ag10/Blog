import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const PrivateRoute = ({children})=>{
    const {token} = useAuth();

    return token? children : <Navigate to='/login' replace></Navigate> //replace is important as it replaces /profile with /login in history
}

export default PrivateRoute;