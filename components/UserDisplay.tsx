"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import Skeleton from "./Skeleton";
import { UserContext } from "@/app/dashboard/layout";

export default function UserDisplay(){

    const [userList, setUserList] = useState<any>([])
    const [searchWord, setSearchWord] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ loading , setLoading ] = useState<boolean>(false)
    const [filteredUserList, setFilteredUserList] = useState<any>([]);

    const {userListContext , setUserListContext}  = useContext(UserContext)

    const router = useRouter();

    useEffect(()=>{
        async function fetchUsers(){
            setLoading(true)
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            const data : any = await res.data;

            const users = data.map((user : any)=>({
                id : user.id,
                name : user.name,
                email : user.email,
                phone : user.phone,
                city : user.address.city
            }))
            setUserList(users);
            setLoading(false);
        }
        // fetchUsers() deleted this , and added userListContext as dependency
        setUserList(userListContext)
    },[userListContext])

    useEffect(() => {
        setFilteredUserList(
            userList.filter((user: any) =>
                user.name.toLowerCase().includes(searchWord.toLowerCase()) ||
                user.city.toLowerCase().includes(searchWord.toLowerCase())
            )
        );
        setCurrentPage(1)
    }, [userList, searchWord]);
    
    // Pagination
    const usersPerPage = 5;
    const totalPages = Math.ceil(userList.length / usersPerPage)
    let totalPagesData = [];

    for(let i =0; i<totalPages ; i++){
        totalPagesData.push({
            pageNumber : i+1
        })
    }

    const startFrom = (currentPage-1) * usersPerPage;
    const endOn = startFrom + usersPerPage;
    const paginatedUsers = filteredUserList.slice(startFrom, endOn)


    return(
        <div className="min-h-calc[(100vh - 4rem)] max-w-screen mt-2">
            
            <div className="w-full px-8 py-6 flex flex-col gap-3 pl-20">

                <div className="flex justify-between w-full items-center">
                    <h2 className="font-normal text-3xl">Dashboard</h2>
                    <button onClick={()=>router.push("/dashboard/add-user")}>
                        <div className="border-[1px] bg-black text-white text-lg px-3 py-2 cursor-pointer rounded-lg"> Add User </div>
                    </button>
                </div>
  
                <input type="text" onChange={(e)=>setSearchWord(e.target.value)} placeholder="Search for name, city..." className="border-[1px] py-2 border-black rounded-lg w-1/3 px-6"/>
            </div>

            {loading && <Skeleton rows={8} columns={4} showHeader={true}/> }
            {}
            <div className="mt-6 ">
                <div className="w-full px-24 pb-2 text-md">
                    Showing {filteredUserList.length === 0 ? 0 : startFrom + 1} to {Math.min(endOn, filteredUserList.length)} users from total {filteredUserList.length} filtered users.
                </div>
                <div className="mx-20  px-10 py-6 rounded-lg z-10 border-[1px] border-gray-500">
                <table className="w-full">
                    <thead className="bg-gray-50 text-left text-sm uppercase text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-16 py-3">Name</th>
                            <th className="px-16 py-3">Email</th>
                            <th className="px-16 py-3">City</th>
                            <th className="px-16 py-3">Phone</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">  
                        {paginatedUsers.map((user : any)=>(
                            <tr key={user.id} className="bg-white dark:bg-gray-800">
                                <td className="px-6 py-4">
                                <div className="h-4 w-[150px] rounded ">{user.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                <div className="h-4 w-[200px] rounded">{user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                <div className="h-4 w-[120px] rounded">{user.city}</div>
                                </td>
                                <td className="px-6 py-4">
                                <div className="h-4 w-[200px] rounded ">{user.phone}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                        
            <div className="flex justify-center w-full gap-2 items-center pt-6">
                {totalPagesData.map((data)=>(
                    <button key={data.pageNumber} onClick={(e)=>setCurrentPage(data.pageNumber)}>
                        <div className={` border-[1px] rounded-lg border-black flex justify-center items-center  cursor-pointer ${data.pageNumber === currentPage ? "h-10 w-10 text-xl bg-black text-white" : "h-8 w-8 text-md bg-white text-black"}`}>
                            {data.pageNumber} 
                        </div>
                    </button>
                ))}
            </div>
        </div>
        </div>
    )
}