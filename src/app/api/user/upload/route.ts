import assignmentModel from "@/app/server/models/assignmentModel";
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

        console.log(userName);
        

        const assignment = new assignmentModel({
            admin,
            assignmentText,
            userName,
            userId
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