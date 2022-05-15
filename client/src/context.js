import { useState, createContext } from "react";

export const AuthContext = createContext();


export default function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    // Wrap the antire app with the context
    return  <AuthContext.Provider value={{ user, setUser }}>
                {children}
            </AuthContext.Provider>
}