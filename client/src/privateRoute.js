import { Navigate } from "react-router-dom";
import { useContext } from "react";

// Context
import { AuthContext } from "./context";


export default function PrivateRoute({ children: component }){
    const { user } = useContext(AuthContext);

    if(user){
        return component;
    }
    else{
        return <Navigate to="/"/>
    }
}