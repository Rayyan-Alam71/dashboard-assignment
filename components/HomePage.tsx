"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from "axios"
const Home = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(()=>{
    async function getUsers(){
      const res = await axios.get("https://jsonplaceholder.typicode.com/users")
      const data : any = await res.data;

      const fetchedUsers = data.map((user : any) =>({
        id : user.id,
        name : user.name,
        email : user.email,
        phone : user.phone,
        address : user.address.city
      }))

      setUsers(fetchedUsers)
      console.log(users)
    }
    getUsers()
  },[])
  // useEffect(()=>{
  //   async function fetchUsers(){
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  //     const data : any = await res.data;
  //     let fetchedUsers :any = []
  //     // @ts-ignore  
  //     for(let i = 0; i< data.length; i++){
  //       const user = {
  //         name : data[i].name,
  //         email : data[i].email,
  //         phone : data[i].phone,
  //         address : data[i].address.city,
  //       }
  //       console.log(user)
  //       fetchedUsers.push(user)
  //     }
  //     console.log(fetchedUsers)
  //     setUsers(fetchedUsers)
  //   }
  //   fetchUsers()
  // },[])

  // useEffect(()=>{
  //   console.log("------------");
  //   console.log(users)
  // } , [users])
  return (
   <div>
    <h2>Admin Dashboard</h2>
    <button className="border-black border-1"><Link href={"/add-user"}>Add User</Link></button>
    <table>
      <tbody>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Phone</th>
      </tr>

      {users.map((user : any)=>(
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>{user.phone}</td>
        </tr>
      ))}
      </tbody>

    </table>
   </div> 
  );
}

export default Home
