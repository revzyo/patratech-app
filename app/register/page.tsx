"use client"
import { useState, FormEvent } from "react"
 import { useRouter } from "next/router"
 import{
    createUserWithEmailAndPassword,
    sendEmailVerification,
 } from "firebase/auth";

 import{auth} from "@/firebase/firebase";

 const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (event:FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            const user = userCredential.user;

            await sendEmailVerification(user);

            localStorage.setItem(
                "registrationData",
                JSON.stringify({
                    firstName,
                    lastName,
                    gender,
                    email,
                })
            );

            setMessage(
                "Registration Successful! Please check your email for verification."
            );
            setFirstName("");
            setLastName("");
            setGender("");
            setEmail("");
            setPassword("");
            setconfirmPassword("");
        } 
        catch(error){
            if (error instanceof Error){
                setError(error.message);
            } else{
                setError("An Unknown Error Occurred");
            }
        }
    };
    return(
        <div className="bg-gradient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col h-screen-relative">
            <h2 className="text-2xl font-bold text-center mb-10">Register</h2>
            <div className="p-5 border border-gray-300 rounded">
                <form onSubmit={handleRegister} className="space-y-6 px-6 pb-4">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                        <label htmlFor="firstName" className="text-sm font-medium block mb-2 text-gray-300">
                            First Name
                        </label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-600 border-gray-500 placeholder-gray-400 text-white" />

                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
 }
