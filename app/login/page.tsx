"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (event:React.FormEvent) => {
        event.preventDefault();
        setError(null);
        
        try{
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
        }
    }
}