import { NextRequest, NextResponse } from "next/server";
import assignmentModel from "@/app/server/models/assignmentModel";

export async function GET(request: NextRequest, {
    params }: { params: { adminId: string } }
) {
    try {
        // getting admin id fro mparams
        const adminId = params.adminId;

        // searching admin account in the database
        const assignments = await assignmentModel.find({
            'admin': adminId
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