// src/context/user.js
import { createContext, useContext, useEffect, useState } from "react";
import { becomeSellerApi, getCurrentUser, loginUser, logoutUser } from "../api.js";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const [user, setUser] = useState(null)

    const hydrateUser = async () => {
        try {
            const response = await getCurrentUser()
            setUser(response.data.data)
        } catch (error) {
            setUser(null)
        } finally {
            setIsLoadingUser(false)
        }
    }

    useEffect(() => {
        hydrateUser()
    }, [])

    const login = async (data) => {
        const response = await loginUser(data)
        setUser(response.data.data.user)
        return response
    }

    const logout = async () => {
        try {
            await logoutUser()
        } finally {
            setUser(null)
        }
    }

    const becomeSeller = async () => {
        const response = await becomeSellerApi()
        setUser(response.data.data)
        return response
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, becomeSeller, hydrateUser, isLoadingUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
