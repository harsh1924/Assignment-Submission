import assignmentModel from "@/app/server/models/assignmentModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const userId = params.userId;
        const assignments = await assignmentModel.find({
            'userId': userId
        });
        
        return NextResponse.json({
            message: 'User Assignments',
            assignments
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: 'Internal Error'
        }, { status: 400 })
    }
}