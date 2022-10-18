import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        logged: false,
        user: null
    })

    const login = (user) => {
        setUser({
            logged: true,
            user: user
        })
    }

    const logout = () => {
        setUser({
            logged: false,
            user: null
        })
    }

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>

    )

}