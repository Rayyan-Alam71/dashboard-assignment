"use client"
import Header from "@/components/Header";
import UserDisplay from "@/components/UserDisplay";

export default function DashBoard(){

    return(
        <>
            <Header/>
            <div className="container mx-auto w-full min-h-calc[(100vh - 4rem)] font-ser">
                    <UserDisplay/>
            </div>
        </>
    )
}