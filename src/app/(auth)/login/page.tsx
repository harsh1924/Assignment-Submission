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
        <div className="flex h-screen items-center justify-center lg:justify-start">
            <form onSubmit={onLogin} className="flex w-full justify-center items-center h-full flex-col gap-10">
                <div className="w-[400px] border shadow-lg lg:shadow-[0_0_10px_#347dfb] px-6 py-4 flex flex-col gap-y-4">
                    <div className="flex gap-y-2 flex-col text-center">
                        <Link href={'/'} className="source-sans-3-bold text-lg text-center">
                            Home
                        </Link>
                        <span className="text-lg source-sans-3-semibold">
                            Login to Your Account
                        </span>
                    </div>
                    <div className="gap-2 flex flex-col text-sm">
                        <label htmlFor="email" className="source-sans-3-semibold">
                            Email
                        </label>
                        <input onChange={handleUserInput} value={user.email} name="email" type="text" id="email" className="p-2 border rounded-md text-[12px] outline-none" placeholder="Enter Your Email" />
                    </div>

                    <div className="gap-2 flex flex-col text-sm">
                        <label htmlFor="password" className="source-sans-3-semibold">
                            Password
                        </label>
                        <input onChange={handleUserInput} name="password" value={user.password} type="password" id="password" className="p-2 border rounded-md text-[12px] outline-none" placeholder="Enter Your Password" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center">
                            {isLoading ? (
                                <button className="rounded-md px-4 py-2 bg-[#0056d2] text-white source-sans-3-regular hover:bg-[#00419e] transition-all ease-in-out duration-300" type="submit">
                                    Log In
                                </button>
                            ) : (
                                <div className="rounded-md px-16 py-3  text-white source-sans-3-regular bg-[#00419e] transition-all ease-in-out duration-300 text-center">
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