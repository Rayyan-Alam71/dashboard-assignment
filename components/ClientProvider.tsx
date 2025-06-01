"use client"

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>({
    userListContext: [],
    setUserListContext: () => {}
});


export interface User {
    id : number ;
    name : string;
    email : string;
    phone : string;
    city : string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [userListContext, setUserListContext] = useState<User[]>([]);
    const [hasMounted , setHasMounted] = useState<boolean>(false)
    
    useEffect(() => {
        setHasMounted(true)
        if(typeof(window) === "undefined") {
            console.log("trapped in window check")
            return
        }
        // On mount, check localStorage for userList
        const localList : string | null = localStorage.getItem("userList");
        if (localList !== null && JSON.parse(localList).length !==0) {
            setUserListContext(JSON.parse(localList));
        } else {
            async function getUsers() {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await res.json();
                const users : User[]= data.map((user: {
                    id: number;
                    name : string;
                    email : string ;
                    phone : string;
                    address : { city : string}
                }) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    city: user.address.city
                }));
                setUserListContext(users);
                localStorage.setItem("userList", JSON.stringify(users));
            }
            getUsers();
        }
    }, []);

    useEffect(() => {
        if(typeof(window) === "undefined") return;
        // Whenever userListContext changes, update localStorage
        localStorage.setItem("userList", JSON.stringify(userListContext));
    }, [userListContext]);

    if(!hasMounted) return null;
    return (
        <UserContext.Provider value={{ userListContext, setUserListContext }}>
            {children}
        </UserContext.Provider>
    );
}