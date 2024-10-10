'use client'

import { LoginButtons } from "@/app/components/Buttons/LoginButton";
import LoadingState from "@/app/components/LoadingState";
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
                <div className="flex items-center">
                    <div className="flex flex-col justify-center items-center h-screen gap-y-6 w-1/2">
                        <div>
                            <LoginButtons />
                        </div>
                        <form className="flex flex-col items-center justify-center gap-y-3" onSubmit={onSubmit}>
                            <div className="flex flex-col  justify-center px-10 py-6 gap-y-3 shadow-lg">
                                <div className="source-sans-3-bold text-xl">
                                    USER: {userNameData}
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="assignment" className="source-sans-3-bold text-xl">
                                        Task
                                    </label>
                                    <textarea name="assignmentText" value={data.assignmentText} id="assignment" placeholder="Write Your Assignment Here...." className="border rounded-md px-4 py-2 outline-none h-[150px] w-[300px] resize-none" onChange={handleUserInput} />
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
                                <button className="rounded-md px-10 py-[16px] bg-[#0056d2] text-white source-sans-3-bold hover:bg-[#00419e] transition-all ease-in-out w-full duration-300" type="submit">
                                    Submit Your Assignment
                                </button>
                            </div>
                            <Link href={'/'} className="rounded-md px-10 py-[10px] border border-[#0056d2] source-sans-3-regular text-xl text-[#00419e]">
                                Home
                            </Link>
                        </form>

                    </div>
                    <div className="h-screen w-[1px] bg-gray-600"></div>
                    <div className="w-1/2 h-screen overflow-scroll no-scrollbar">
                        <span className="source-sans-3-bold flex items-center justify-center pb-10 text-xl">
                            All Assignments
                        </span>
                        <div className="flex flex-col">
                            {userAssignments.map((e: { assignmentText: string; isRejected: string }) =>
                                <div className="flex px-10 gap-x-40 source-sans-3-regular gap-y-6">
                                    <span className="w-1/2">
                                        {e.assignmentText}
                                    </span>
                                    <span className="flex w-1/2">
                                        {e.isRejected === '1' && (
                                            <div className="text-white bg-blue-600 px-4 py-2 rounded-md mb-6">
                                                Submitted
                                            </div>
                                        )}
                                        {e.isRejected === '2' && (
                                            <div className="text-white bg-green-600 px-4 py-2 rounded-md mb-6">
                                                Accepted
                                            </div>
                                        )}
                                        {e.isRejected === '3' && (
                                            <div className="text-white bg-red-600 px-4 py-2 rounded-md mb-6">
                                                Rejected
                                            </div>
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;