import assignmentModel from "@/app/server/models/assignmentModel";
import userModel from "@/app/server/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { assignmentText, admin, userName, userId } = reqBody;
        if (!assignmentText) {
            return NextResponse.json({
                error: 'All fields are required'
            }, { status: 400 })
        }

        const adminn = await userModel.findById(admin);
        const adminName = adminn.name;

        const assignment = new assignmentModel({
            admin,
            assignmentText,
            userName,
            userId,
            adminName
        });
        await assignment.save();

        return NextResponse.json({
            message: 'Uploaded Successfully'
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            error: 'Internal Error'
        }, { status: 500 })
    }
}