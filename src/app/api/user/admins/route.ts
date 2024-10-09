import userModel from "@/app/server/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const admins = await userModel.find({
            'role': 'ADMIN'
        });
        
        return NextResponse.json({
            message: 'All Admins',
            admins
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: 'Internal Error',
        }, { status: 400 });
    }
}