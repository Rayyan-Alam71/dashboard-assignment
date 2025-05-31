"use client"
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>({
    userListContext: [],
    setUserListContext: () => {}
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [userListContext, setUserListContext] = useState<any>([]);

    useEffect(() => {
        // On mount, check localStorage for userList
        const localList = localStorage.getItem("userList");
        if (localList !== null && JSON.parse(localList).length !==0) {
            setUserListContext(JSON.parse(localList));
        } else {
            async function getUsers() {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await res.json();
                const users = data.map((user: any) => ({
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
        // Whenever userListContext changes, update localStorage
        localStorage.setItem("userList", JSON.stringify(userListContext));
    }, [userListContext]);

    return (
        <UserContext.Provider value={{ userListContext, setUserListContext }}>
            {children}
        </UserContext.Provider>
    );
}
