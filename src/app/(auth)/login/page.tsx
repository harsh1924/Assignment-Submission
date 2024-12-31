/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleUserInput = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const onLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            toast.error('Please fill all the details');
            return;
        }
        try {
            setIsLoading(false);
            const response = await axios.post('/api/login', user);

            if (response) {
                toast.success('Login Successfull');
                router.push('/')
                setIsLoading(true)
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
            setIsLoading(true)
            console.log('Login Failed', error.message);
        }
    }

    return (
        <div className="flex justify-center lg:justify-start items-center bg-neutral-100/80 h-screen">
            <form onSubmit={onLogin} className="flex flex-col justify-center items-center gap-10 w-full h-full">
                <div className="flex flex-col gap-y-4 bg-white shadow-md px-6 py-4 border w-[400px]">
                    <div className="flex flex-col gap-y-2 px-6 py-10 text-center">
                        <Link href={'/'} className="text-lg source-sans-3-bold">
                        AssignMate
                        </Link>
                        <span className="text-center text-lg source-sans-3-semibold">
                            Login to Your Account
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <label htmlFor="email" className="source-sans-3-semibold">
                            Email
                        </label>
                        <input onChange={handleUserInput} value={user.email} name="email" type="text" id="email" className="p-2 border rounded-md text-[12px] outline-none" placeholder="Enter Your Email" />
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <label htmlFor="password" className="source-sans-3-semibold">
                            Password
                        </label>
                        <input onChange={handleUserInput} name="password" value={user.password} type="password" id="password" className="p-2 border rounded-md text-[12px] outline-none" placeholder="Enter Your Password" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center items-center">
                            {isLoading ? (
                                <button className="bg-[#0056d2] hover:bg-[#00419e] px-4 py-2 rounded-md text-white transition-all duration-300 ease-in-out source-sans-3-regular" type="submit">
                                    Log In
                                </button>
                            ) : (
                                <div className="bg-[#00419e] px-16 py-3 rounded-md text-center text-white transition-all duration-300 ease-in-out source-sans-3-regular">
                                    Processing....
                                </div>
                            )}
                        </div>
                        <div className="text-[13px] text-center text-gray-500">
                            Dont have an account? {" "}
                            <Link href={'/signup'} className="text-[#347dfb] source-sans-3-regular">Create New Account</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;