"use client"
import Header from "@/components/Header";
import UserAddForm from "@/components/UserAddForm";
import { ArrowLeftFromLineIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../layout";

export default function AddUser(){
    return(
        <div>
            <Header/>
            <div className="container mx-auto w-full min-h-calc[(100vh - 4rem)] dark:bg-white">
                <UserAddForm/>
            </div>
        </div>
    )
}
