import { createContext, useReducer, useState, useEffect } from "react";
import { findAll } from "../services/userService";
import { usersReducer } from "../reducers/usersReducer";

export const UserContext = createContext();

const initialUsers = [];

export const UserProvider = ({ children }) => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    
    const getUsers = async () => {
        try {
            const result = await findAll();
            dispatch({
                type: 'loadingUsers',
                payload: result.data, // Asegúrate de que result.data sea un arreglo
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, getUsers }}>
            {children}
        </UserContext.Provider>
    );
};
