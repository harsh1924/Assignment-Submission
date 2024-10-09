import { GetIdFromToken } from "@/app/helpers/getIdFromToken";
import connectToDB from "@/app/server/dbConfig/dbConfig";
import userModel from "@/app/server/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await GetIdFromToken(request)
        console.log(userId);

        const user = await userModel.findOne({ _id: userId })
        return NextResponse.json({
            message: 'User',
            user
        }, { status: 200 })
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}