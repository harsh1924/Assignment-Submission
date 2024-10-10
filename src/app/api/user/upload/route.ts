import assignmentModel from "@/app/server/models/assignmentModel";
import userModel from "@/app/server/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // gettin data from request body
        const { assignmentText, admin, userName, userId } = reqBody;
        // checking all the details are present or not
        if (!assignmentText || !admin || !userName || !userId) {
            return NextResponse.json({
                error: 'All fields are required'
            }, { status: 400 })
        }

        // searching sepecific admin name by admin id
        const adminn = await userModel.findById(admin);
        const adminName = adminn.name;

        //creating an entry with adminId, adminName, userId, userName and assignmnetText
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