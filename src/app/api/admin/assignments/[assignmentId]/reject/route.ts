import { NextRequest, NextResponse } from "next/server";
import assignmentModel from "@/app/server/models/assignmentModel";

export async function POST(request: NextRequest, {
    params }: { params: { assignmentId: string } }
) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;
        const assignmentId = params.assignmentId;
        const assignment = await assignmentModel.findOneAndUpdate(
            {
                $and: [
                    { 'admin': id },
                    { '_id': assignmentId }
                ]
            },
            {
                $set: {
                    'isRejected': '3'
                }
            }
        );

        return NextResponse.json({
            message: 'Admin Assignments',
            assignment
        }, { status: 200 })
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}