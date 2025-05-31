"use client"
import Header from "@/components/Header";
import {  useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    router.push("/dashboard")
  })
  return (
    <>
      <h2>Move to /dashboard</h2>
      <Header/>
    </>
  )
}
