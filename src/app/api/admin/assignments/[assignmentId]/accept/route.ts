import { NextRequest, NextResponse } from "next/server";
import assignmentModel from "@/app/server/models/assignmentModel";

export async function POST(request: NextRequest, {
    params }: { params: { assignmentId: string } }
) {
    try {
        // getting assignmentId from params and admin id from request body
        const reqBody = await request.json();
        const { id } = reqBody;
        const assignmentId = params.assignmentId;

        // searching the specific assignment and changing the isRejected value to 2. Here 1 is default means no action, 2 means accepted and 3 means rejected
        const assignment = await assignmentModel.findOneAndUpdate(
            {
                $and: [
                    { 'admin': id },
                    { '_id': assignmentId }
                ]
            },
            {
                $set: {
                    'isRejected': '2'
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