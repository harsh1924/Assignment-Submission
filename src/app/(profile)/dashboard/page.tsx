'use client'

import { LoginButtons } from "@/app/components/Buttons/LoginButton";
import LoadingState from "@/app/components/LoadingState";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState('');
    const [adminId, setAdminId] = useState('');
    const [assignments, setAssignments] = useState([]);

    const getId = async () => {
        const res = await axios.get('/api/misc/user-details')
        const userName = res.data.user.name;
        const userId = res.data.user._id;
        const response = await axios.get(`/api/admin/${userName}/assignments`);
        const adminAssignments = response.data.assignments;
        setAssignments(adminAssignments);
        setIsLoading(false);
    }

    useEffect(() => {
        getId()
    }, []);

    return (
        <div>
            {isLoading ? (
                <LoadingState />
            ) : (
                <div className="flex flex-col  px-40 py-10 gap-4">
                    {assignments.map((e: { admin: string; assignmentText: string; _id: string; isRejected: string }) =>
                        <div className="flex gap-20">
                            <div className="w-64">
                                {e._id}
                            </div>
                            <div className="w-64">
                                {e.assignmentText}
                            </div>
                            {e.isRejected === '1' && (
                                <div className="flex gap-x-10">
                                    <button className="text-white bg-green-600 px-4 py-2 rounded-md">
                                        Accept
                                    </button>
                                    <button className="text-white bg-red-600 px-4 py-2 rounded-md">
                                        Reject
                                    </button>
                                </div>
                            )}
                            {e.isRejected === '2' && (
                                <div className="flex gap-x-10">
                                    accepted
                                </div>
                            )}
                            {e.isRejected === '3' && (
                                <div className="flex gap-x-10">
                                    rejected
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            <div className="flex items-center justify-center">
                <LoginButtons />
            </div>
        </div>
    );
}

export default AdminDashboard;