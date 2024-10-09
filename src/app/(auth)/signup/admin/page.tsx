/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminSignInPage() {

    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        type: 'ADMIN'
    });

    const handleUserInput = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const onSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setIsLoading(false)
            const response = await axios.post('/api/register', user);

            if (response) {
                toast.success('Account Created Successfully')
                setIsLoading(true)
                router.push('/login');
            }
        } catch (error: any) {
            setIsLoading(true)
            toast.error(error.response.data.error);
            return NextResponse.json({ error: error.message },
                { status: 400 })
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={onSignup} className="flex flex-col gap-6">
                <Link href={'/'} className="source-sans-3-bold text-lg text-center">
                    Home
                </Link>
                <div className="w-[400px] shadow-[0_0_10px_#347dfb] px-6 py-4 flex flex-col gap-y-4">
                    <h2 className="source-sans-3-semibold text-xl">
                        Create Your Account
                    </h2>
                    <div className="gap-2 flex flex-col">
                        <label htmlFor="name" className="source-sans-3-semibold">
                            Admin Name
                        </label>
                        <input onChange={handleUserInput} value={user.name} name="name" type="text" id="name" className="p-2 source-sans-3-regular border rounded-md text-[12px] outline-none" placeholder="Enter Your Name" />
                        <span>
                        </span>
                    </div>
                    <div className="gap-2 flex flex-col">
                        <label htmlFor="email" className="source-sans-3-semibold">
                            Admin Email
                        </label>
                        <input onChange={handleUserInput} value={user.email} name="email" type="email" id="email" className="p-2 source-sans-3-regular border rounded-md text-[12px] outline-none" placeholder="Enter Your Email" />
                    </div>
                    <div className="gap-2 flex flex-col">
                        <label htmlFor="password" className="source-sans-3-semibold">
                            Password
                        </label>
                        <input onChange={handleUserInput} value={user.password} name="password" type="password" id="password" className="p-2 source-sans-3-regular border rounded-md text-[12px] outline-none" placeholder="Enter Your Password" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center">
                            {isLoading ? (
                                <button className="rounded-md px-4 py-2 bg-[#0056d2] text-white source-sans-3-regular hover:bg-[#00419e] transition-all ease-in-out duration-300" type="submit">
                                    Create Admin Account
                                </button>
                            ) : (
                                <div className="rounded-md px-16 py-3 text-white source-sans-3-regular bg-[#00419e] transition-all ease-in-out duration-300 text-center">
                                    Processing....
                                </div>
                            )}
                        </div>
                        <div className="source-sans-3-regular text-[15px] text-gray-500">
                            Already have an account? {" "}
                            <Link href={'/login'} className="text-[#347dfb]">Log In</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}