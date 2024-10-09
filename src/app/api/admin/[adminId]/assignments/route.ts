import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { GetToken } from "@/app/helpers/getToken";
import assignmentModel from "@/app/server/models/assignmentModel";

export async function GET(request: NextRequest, {
    params }: { params: { adminId: string } }
) {
    try {
        const adminName = params.adminId;
        const assignments = await assignmentModel.find({
            'admin': adminName
        });

        return NextResponse.json({
            message: 'Admin Assignments',
            assignments
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}