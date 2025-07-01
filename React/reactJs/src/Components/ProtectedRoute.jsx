import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {isAuthenticated,loading} = useSelector((state)=>state.auth);
    if(loading){
        return<div>loading...</div>
    }
    if(!isAuthenticated){
        return  <Navigate to="/login"/>
    }
    return children;
}

export default ProtectedRoute;