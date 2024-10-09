'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export const LoginButtons = () => {
    const router = useRouter();
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
        const res = await axios.get('/api/user/user-details')
        const userId = res.data.user._id;
        setUserIdData(userId);
        setUserRole(res.data.user.role);
        if (userRole === 'ADMIN') {
            setIsAdmin(true)
        }
    }

    useEffect(() => {
        getToken()
    }, []);

    return (
        <div>
            <div className="flex items-center justify-center">
                <div>
                    {isLoggedIn && (
                        <Link href={'/login'} className="flex h-[600px] items-center justify-center w-screen">
                            <span className="rounded-sm px-5 py-[10px] bg-[#0056d2] text-white source-sans-3-bold hover:bg-[#00419e] transition-all ease-in-out duration-300">
                                Login / Register
                            </span>
                        </Link>
                    )}
                </div>
                <div className="flex pr-7 w-screen">
                    {!isLoggedIn && (
                        <div className="flex h-[600px] items-center justify-center w-full">
                            <button className="rounded-sm px-5 py-[10px] bg-[#0056d2] text-white source-sans-3-regular text-xl hover:bg-[#00419e] transition-all ease-in-out duration-300" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div >
        </div>
    )
}