"use client"
import { useState } from "react";
import { ArrowLeftFromLine, ArrowLeftFromLineIcon, Check, MapPinHouseIcon, PackageCheckIcon, User } from 'lucide-react';
import { useRouter } from "next/navigation";
const UserAddForm = () =>{
    const router = useRouter()
    const [step , setStep] = useState(1);
    const [formData, setFormData] = useState<any>({
        name : "",
        email : "",
        city : "",
        zip : "",
        street : ""
    })
    const [error, setError] = useState<any>({
        name : false,
        email : false,
        street : false,
        city : false,
        zip : false
    })
    const [ submitted, setSubmitted ] = useState<boolean>(false);
    const [stepOnePassed, setStepOnePassed] = useState<boolean>(false)
    const handleInputChange = (e : any) => {
        setFormData((prev : any)  => ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
        setError((prev : any)=>({
            ...prev , 
            [e.target.name] : false
        }))
    }

    function errorHandleFormOne(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let hasError = false;
        if(formData.name === ''){
            setError((prev : any) =>({
                ...prev , 
                name : true
            }))
            hasError = true;
        }
        if(formData.email === '' || !emailRegex.test(formData.email)){
            setError((prev : any) =>({
                ...prev , 
                email : true
            }))
            hasError = true;
        }
        return hasError;
    }
    
    function handleStepOneNext(e : any){
        e.preventDefault();
        if(!errorHandleFormOne()){
            if(step < 3) {
                setStep(step+1)
                setStepOnePassed(true)
            } 
        }
    }
    function errorHandleFormTwo(){
        let hasError = false;
        if(formData.street === ''){
            setError((prev : any) =>({
                ...prev , 
                name : true
            }))
            hasError = true;
        }
        if(formData.city === ''){
            setError((prev : any) =>({
                ...prev , 
                email : true
            }))
            hasError = true;
        }
        if(formData.zip === ''){
            setError((prev : any) =>({
                ...prev , 
                zip : true
            }))
            hasError = true;
        }
        return hasError;
    }
    
    function handleStepTwoNext(e : any){
        e.preventDefault()
        if(!errorHandleFormTwo()){
            if(step < 3) setStep(step+1)
        }
    }

    function handleSubmitForm(e : any){
        e.preventDefault()
        setSubmitted(true)
        // use recoil to add the new user to the userList
        alert(`${formData.name} added succesfully`)
        router.push("/dashboard")
    }

    function handleCancelForm(){
        setFormData((prev : any)=>({
            ...prev ,
            name : '',
            email : '',
            street : '',
            city : '',
            zip : '',
        }))
        setStep(1)
        setSubmitted(false)
        setStepOnePassed(false)
    }
    return(
        <div className="w-full flex flex-col justify-center gap-1 items-center mt-20">
            <div className="flex flex-start w-3/4">
                <button onClick={()=>router.push("/dashboard")}><div className="flex justify-center items-center gap-4 cursor-pointer text-lg text-gray-100 rounded-lg bg-black px-4 py-2 font-serif ">
                <ArrowLeftFromLineIcon />    
                Go To Dashboard
            </div></button>
            </div>
            <div className="flex justify-around items-center mb-4 w-1/3">
                {/* for step circles */}
                {(step === 2 || stepOnePassed) ? (
                    <div className="h-12 w-12 bg-black rounded-[50%] border-[2px] border-black flex justify-center items-center text-lg text-white font-bold"><Check/></div>
                ) : (
                    <div className="h-12 w-12 bg-white rounded-[50%] border-[2px] border-gray-500 flex justify-center items-center text-lg text-gray-500 font-bold"><User /></div>
                )}

                {step === 3 ? (
                    <div className="h-12 w-12 bg-black rounded-[50%] border-[2px] border-black flex justify-center items-center text-lg text-white font-bold"><Check/></div>
                ) : (
                    <div className="h-12 w-12 bg-white rounded-[50%] border-[2px] border-gray-500 flex justify-center items-center text-lg text-gray-500 font-bold"><MapPinHouseIcon /></div>
                )}

                {submitted  ? (
                     <div className="h-12 w-12 bg-black rounded-[50%] border-[2px] border-black flex justify-center items-center text-lg text-white font-bold"><Check/></div>
                ):(
                    <div className="h-12 w-12 bg-white rounded-[50%] border-[2px] border-gray-500 flex justify-center items-center text-lg text-gray-500 font-bold"><PackageCheckIcon /></div>
                )}
            </div>

            <div className="bg-white border-[2px] border-gray-200 w-1/2 rounded-lg z-10 font-serif">
                {/* for step forms */}

                {step === 1 && (
                   <>
                    <div className="flex justify-center py-4 text-xl font-semibold">
                        <p className="text-2xl font-serif text-gray-700">Step 1 : Basic Info</p>
                    </div>
                    
                    <div className="py-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-lg ">Enter Name</p>

                            <input type="text" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg text-md text-gray-800" name = "name" placeholder="Enter your name....." onChange={handleInputChange} required/>
                            {error.name && <p className="text-red-600">Name must not be empty.</p>}
                        </div>
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-lg ">Enter Email</p>
                            <input type="email" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg text-md text-gray-800"
                            name="email"
                            placeholder="Enter your email...."
                            onChange={handleInputChange} required/>
                            {error.email && <p className="text-red-600">Email must be a valid email.</p>}
                        </div>
                    </div>

                    <div className="flex flex-row-reverse pb-6 pr-10 ">
                        <button className="border-[1px] bg-black text-white text-lg  px-4 py-2 rounded-lg cursor-pointer" onClick={handleStepOneNext}> Next </button>
                    </div>
                   </>
                )}

                {step === 2 && (
                   <>
                    <div className="flex justify-center py-4 text-xl font-semibold">
                        <p className="text-2xl font-serif text-gray-700">Step 2 : Address Info </p>
                    </div>
                    
                    <div className="py-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-lg ">Enter Street</p>

                            <input type="text" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg text-md text-gray-800" name = "street" placeholder="Enter your street....." onChange={handleInputChange} required/>
                            {error.street && <p className="text-red-600">Street must not be empty.</p>}


                        </div>
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-lg ">Enter City</p>

                            <input type="text" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg text-md text-gray-800"
                            name="city"
                            placeholder="Enter your city...."
                            onChange={handleInputChange} required/>
                            {error.city && <p className="text-red-600">City must not be empty.</p>}
                        </div>
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-lg ">Enter Zip Code</p>

                            <input type="number" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg text-md text-gray-800"
                            name="zip"
                            placeholder="Enter your zip code...."
                            onChange={handleInputChange} required/>
                            {error.zip && <p className="text-red-600">Enter a valid Zip code.</p>}
                        </div>
                    </div>

                    <div className="flex flex-row-reverse pb-6 pr-10 ">
                        <button className="border-[1px] bg-black text-white text-md  px-3 py-2 rounded-lg cursor-pointer" onClick={handleStepTwoNext}> Next </button>
                    </div>
                   </>
                )}

                {step === 3 && (
                    <>
                    <div className="flex justify-center py-4 text-xl font-semibold">
                        <p className="text-2xl font-serif text-gray-700">Step 3 : Review and Confirm </p>
                    </div>
                    
                    <div className="py-6 flex flex-col gap-6">
                        <div className="pl-10 flex flex-col gap-1">
                            <div><p>Name : {formData.name}</p></div>
                            <div><p>Email : {formData.email}</p></div>
                            <div><p>Street : {formData.street}</p></div>
                            <div><p>City : {formData.city}</p></div>
                            <div><p>Zip Code : {formData.zip}</p></div>
                        </div>
                        <div>
                            {/* confirmation */}
                            <p className="pl-12 text-lg text-blue-900">Do you confirm that above details are correct.</p>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse gap-3 pb-6 pr-10 ">
                        <button className="border-[1px] bg-black text-white text-md  px-3 py-2 rounded-lg cursor-pointer" onClick={handleSubmitForm}> Yes, I Confirm </button>
                        <button className="border-[1px] bg-red-700 text-white text-md  px-3 py-2 rounded-lg cursor-pointer" onClick={handleCancelForm}> Cancel</button>
                    </div>
                   </>
                )}
            </div>
        </div>
    )
}

export default UserAddForm;