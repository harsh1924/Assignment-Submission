'use client'

import { LoginButtons } from "@/app/components/Buttons/LoginButton";
import LoadingState from "@/app/components/LoadingState";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [userNameData, setUserNameData] = useState('');
    const [userIdData, setUserIdData] = useState('');
    const [admins, setAdmins] = useState([]);
    const [data, setData] = useState({
        assignmentText: '',
        admin: '',
        userName: '',
        userId: ''
    })

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
        setIsLoading(false);
    }

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/upload', data);
            if (res) toast.success('Assignment Submitted')
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
                <div className="flex flex-col justify-center items-center h-screen gap-y-6">
                    <LoginButtons />
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
                    </form>

                </div>
            )}
        </div>
    );
}

export default ProfilePage;