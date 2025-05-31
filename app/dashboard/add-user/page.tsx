import Header from "@/components/Header";
import UserAddForm from "@/components/UserAddForm";

export default function AddUser(){
    return(
        <div>
            <Header/>
            <div className="container mx-auto w-full min-h-calc[(100vh - 4rem)]">
                <UserAddForm/>
            </div>
        </div>
    )
}