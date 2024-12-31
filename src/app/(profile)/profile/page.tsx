'use client'

import { LoginButtons } from "@/app/components/Buttons/LoginButton";
import LoadingState from "@/app/components/LoadingState";
import { Navbar } from "@/app/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [userNameData, setUserNameData] = useState('');
    const [userIdData, setUserIdData] = useState('');
    const [admins, setAdmins] = useState([]);
    const [data, setData] = useState({
        assignmentText: '',
        admin: '',
        userName: '',
        userId: ''
    });
    const [userAssignments, setUserAssignments] = useState([]);

    const handleUserInput = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const getAdmins = async () => {
        const res = await axios.get('/api/user/admins');
        setAdmins(res.data.admins);
    }

    const getId = async () => {
        const res = await axios.get('/api/misc/user-details')
        const userName = res.data.user.name;
        const userId = res.data.user._id;
        setUserNameData(userName);
        setUserIdData(userId);
        getAdmins();
        setData({
            ...data,
            userName: userName,
            userId: userId
        })
        const response = await axios.get(`/api/misc/${userId}/getUserAssignments`);
        const assignments = response.data.assignments;
        setUserAssignments(assignments);
        setIsLoading(false);
        router.refresh();
    }

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/upload', data);
            if (res) {
                toast.success('Assignment Submitted');
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        getId()
    }, []);
    return (
        <div>
            {isLoading ? (
                <div>
                    <LoadingState />
                </div>
            ) : (
                <div className="">
                    <Navbar />
                    <div className="flex py-6">
                        <div className="w-1/2">
                            <form className="flex flex-col items-center gap-y-3" onSubmit={onSubmit}>
                                <div className="flex flex-col gap-y-3 shadow-lg px-10 py-6">
                                    <div className="text-xl source-sans-3-bold">
                                        USER: {userNameData}
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <label htmlFor="assignment" className="text-xl source-sans-3-bold">
                                            Task
                                        </label>
                                        <textarea name="assignmentText" value={data.assignmentText} id="assignment" placeholder="Write Your Assignment Here...." className="px-4 py-2 border rounded-md w-[300px] h-[150px] outline-none resize-none" onChange={handleUserInput} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="adminId">
                                            Select Admin to assign the task
                                        </label>
                                        <select name="admin" id="adminId" className="p-2 border rounded-md text-[13px] outline-none" onChange={handleUserInput} value={data.admin}>
                                            <option value='{e.name}'>
                                                Select Admin
                                            </option>
                                            {admins.map((e: { name: string; _id: string }) =>
                                                <option key={e._id} value={e._id}>
                                                    {e.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                    <button className="bg-[#0056d2] hover:bg-[#00419e] px-10 py-[16px] rounded-md w-full text-white transition-all duration-300 ease-in-out source-sans-3-bold" type="submit">
                                        Submit Your Assignment
                                    </button>
                                </div>
                            </form>

                        </div>
                        <div className="bg-gray-400 w-[1px] h-screen"></div>
                        <div className="w-1/2 h-screen overflow-scroll no-scrollbar">
                            <span className="flex justify-center items-center pb-10 text-xl source-sans-3-bold">
                                All Assignments
                            </span>
                            <div className="flex flex-col">
                                {userAssignments.map((e: { assignmentText: string; isRejected: string }) =>
                                    <div className="flex items-center gap-x-40 gap-y-6 px-10 border-b source-sans-3-regular">
                                        <span className="w-1/2">
                                            {e.assignmentText}
                                        </span>
                                        <span className="flex justify-center items-center py-2 w-1/2 max-h-screen">
                                            {e.isRejected === '1' && (
                                                <div className="bg-blue-600 px-4 py-2 rounded-md text-white">
                                                    Submitted
                                                </div>
                                            )}
                                            {e.isRejected === '2' && (
                                                <div className="bg-green-600 px-4 py-2 rounded-md text-white">
                                                    Accepted
                                                </div>
                                            )}
                                            {e.isRejected === '3' && (
                                                <div className="bg-red-600 px-4 py-2 rounded-md text-white">
                                                    Rejected
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;