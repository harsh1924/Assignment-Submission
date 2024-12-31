'use client'

import { LoginButtons } from "@/app/components/Buttons/LoginButton";
import LoadingState from "@/app/components/LoadingState";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Navbar } from "@/app/components/Navbar";


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
                <div className="">
                    <Navbar />
                    <div className="flex justify-center items-center pt-10 max-h-screen">
                        <Table className="mx-auto border rounded-sm w-[90%]">
                            <TableCaption>All Assignments</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        User Name
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Task
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Accepted/Rejected
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assignments.map((e: { admin: string; assignmentText: string; userName: string; isRejected: string; _id: string }) =>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            {e.userName}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {e.assignmentText}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {e.isRejected === '1' && (
                                                <div>
                                                    <button className="border-green-600 px-4 py-2 border rounded-md text-green-600" onClick={() => acceptAssignment(e._id)}>
                                                        Accept
                                                    </button>
                                                    <button className="px-4 py-2 border border-red-600 rounded-md text-red-600" onClick={() => rejectAssignment(e._id)}>
                                                        Reject
                                                    </button>
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
                                            )}</TableCell>
                                    </TableRow>


                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
            {/* <div className="flex justify-center items-center gap-6">
                <LoginButtons />
                <Link href={'/'} className="bg-[#0056d2] hover:bg-[#00419e] px-10 py-[10px] rounded-md text-white transition-all duration-300 ease-in-out source-sans-3-regular">
                    Home
                </Link>
            </div> */}
        </div>
    );
}

export default AdminDashboard;