"use client"
import { useState } from "react";

const UserAddForm = () =>{
    
    const [step , setStep] = useState(1);
    const [formData, setFormData] = useState<any>({
        name : "",
        email : "",
        city : "",
        zip : "",
        street : ""
    })
    const handleNext = () =>{
        if(step < 3) setStep(step + 1);
    }
    const handleInputChange = (e : any) => {
        setFormData((prev : any)  => ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
        console.log(e.target.name)
        console.log(e.target.value)
    }
    return(
        <div className="w-full flex flex-col justify-center gap-1 items-center mt-20">
            <div>
                {/* for step circles */}
                balls
            </div>
            <div className="bg-fuchsia-50 w-3/5 rounded-lg z-10">
                {/* for step forms */}

                {step === 1 && (
                   <>
                    <div className="flex justify-center py-4 text-xl font-semibold">
                        <h3>Step 1 : Basic Info</h3>
                    </div>
                    
                    <div className="py-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-md ">Enter Name</p>

                            <input type="text" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg" name = "name" placeholder="Enter your name....." onChange={handleInputChange} required/>

                        </div>
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-md ">Enter Email</p>
                            <input type="email" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg"
                            name="email"
                            placeholder="Enter your email...."
                            onChange={handleInputChange} required/>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse pb-6 pr-10 ">
                        <button className="border-[1px] bg-black text-white text-md  px-3 py-2 rounded-lg cursor-pointer" onClick={handleNext}> Next </button>
                    </div>
                   </>
                )}

                {step === 2 && (
                   <>
                    <div className="flex justify-center py-4 text-xl font-semibold">
                        <h3>Step 2 : Address Info </h3>
                    </div>
                    
                    <div className="py-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-md ">Enter Street</p>

                            <input type="text" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg" name = "street" placeholder="Enter your street....." onChange={handleInputChange} required/>

                        </div>
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-md ">Enter City</p>

                            <input type="text" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg"
                            name="city"
                            placeholder="Enter your city...."
                            onChange={handleInputChange} required/>
                        </div>
                        <div className="flex flex-col gap-1 pl-10">
                            <p className="text-md ">Enter Zip Code</p>

                            <input type="number" className="w-1/2 py-2 px-3 border-[1px] border-black rounded-lg"
                            name="zip"
                            placeholder="Enter your zip code...."
                            onChange={handleInputChange} required/>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse pb-6 pr-10 ">
                        <button className="border-[1px] bg-black text-white text-md  px-3 py-2 rounded-lg cursor-pointer" onClick={handleNext}> Next </button>
                    </div>
                   </>
                )}

                {step === 3 && (
                   <>
                    <div className="flex justify-center py-4 text-xl font-semibold">
                        <h3>Step 3: Review and Confirm </h3>
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
                            <p>Do you confirm that above details are correct.</p>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse pb-6 pr-10 ">
                        <button className="border-[1px] bg-black text-white text-md  px-3 py-2 rounded-lg cursor-pointer" onClick={handleNext}> Yes, I Confirm </button>
                    </div>
                   </>
                )}
            </div>
        </div>
    )
}

export default UserAddForm;