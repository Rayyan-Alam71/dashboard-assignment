"use client"
import Header from "@/components/Header";
import Skeleton from "@/components/Skeleton";
import {  useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  useEffect(()=>{
    router.push("/dashboard")
  })
  return (
    <>
      <Header/>
      <Skeleton rows={8} columns={4} showHeader={true} />  
    </>
  )
}
