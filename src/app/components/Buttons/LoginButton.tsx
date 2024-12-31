'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import LoadingState from "../LoadingState"


export const LoginButtons = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userIdData, setUserIdData] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const getToken = async () => {
        try {
            const res = await axios.get('/api/getToken');
            const token = res.data.token;
            if (token !== '\"\"') {
                setIsLoggedIn(false);
                getId()
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try {
            await axios.get('/api/logout')
            router.push('/');
            toast.success('Logout Successfull');
            setIsLoggedIn(true);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getId = async () => {
        const res = await axios.get('/api/misc/user-details')
        const userId = res.data.user._id;

        setUserIdData(userId);
        setUserRole(res.data.user.role);
        const role = res.data.user.role;
        if (role == 'ADMIN') {
            setIsAdmin(true)
        }
        setIsLoading(true);
    }

    useEffect(() => {
        getToken()
    }, []);

    return (
        <div>
            {!isLoading ? (
                <LoadingState />
            ) : (
                <div>
                    <div>
                        {isLoggedIn && (
                            <div>
                                <Link href={'/login'}>
                                    <span className="bg-[#0056d2] hover:bg-[#00419e] px-10 py-[16px] rounded-md text-white transition-all duration-300 ease-in-out source-sans-3-bold">
                                        Login / Register
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        {!isLoggedIn && (
                            <div className="flex gap-x-6">
                                <button className="bg-[#0056d2] hover:bg-[#00419e] px-10 py-[10px] rounded-md text-white transition-all duration-300 ease-in-out source-sans-3-regular" onClick={logout}>
                                    Logout
                                </button>
                                {isAdmin ? (
                                    <Link href={'/dashboard'} className="bg-[#0056d2] hover:bg-[#00419e] px-10 py-[10px] rounded-md text-white transition-all duration-300 ease-in-out source-sans-3-regular">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link href={'/profile'} className="bg-[#0056d2] hover:bg-[#00419e] px-10 py-[10px] rounded-md text-white transition-all duration-300 ease-in-out source-sans-3-regular">
                                        Profile
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div >
            )}
        </div>
    )
}