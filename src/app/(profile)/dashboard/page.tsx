'use client'

import { LoginButtons } from "@/app/components/Buttons/LoginButton";
import LoadingState from "@/app/components/LoadingState";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminDashboard = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState('');
    const [adminId, setAdminId] = useState({
        id: ''
    });
    const [assignments, setAssignments] = useState([]);
    const router = useRouter();

    const getId = async () => {
        const res = await axios.get('/api/misc/user-details')
        // const userName = res.data.user.name;
        const userId = res.data.user._id;
        setAdminId({
            ...adminId,
            id: userId
        });
        const response = await axios.get(`/api/admin/${userId}/assignments`);
        const adminAssignments = response.data.assignments;
        setAssignments(adminAssignments);
        setIsLoading(false);
    }

    const acceptAssignment = async (id: string) => {
        const res = await axios.post(`api/admin/assignments/${id}/accept`, adminId);
        setTimeout(() => {
            window.location.reload();
        }, 100);
        if (res) {
            toast.success('Assignment Accepted')
        }
    }

    const rejectAssignment = async (id: string) => {
        const res = await axios.post(`api/admin/assignments/${id}/reject`, adminId);
        setTimeout(() => {
            window.location.reload();
        }, 100);
        if (res) {
            toast.success('Assignment Rejected')
        }
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
                        <div className="flex gap-20 items-center">
                            <div className="w-64">
                                {e._id}
                            </div>
                            <div className="w-64">
                                {e.assignmentText}
                            </div>
                            {e.isRejected === '1' && (
                                <div className="flex gap-x-10">
                                    <button className="text-white bg-green-600 px-4 py-2 rounded-md" onClick={() => acceptAssignment(e._id)}>
                                        Accept
                                    </button>
                                    <button className="text-white bg-red-600 px-4 py-2 rounded-md" onClick={() => rejectAssignment(e._id)}>
                                        Reject
                                    </button>
                                </div>
                            )}
                            {e.isRejected === '2' && (
                                <div className="text-white bg-green-600 px-4 py-2 rounded-md">
                                    Accepted
                                </div>
                            )}
                            {e.isRejected === '3' && (
                                <div className="text-white bg-red-600 px-4 py-2 rounded-md">
                                    Rejected
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