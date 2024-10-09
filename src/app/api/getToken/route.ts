import { GetToken } from "@/app/helpers/getToken";
import connectToDB from "@/app/server/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(request: NextRequest) {
    try {
        const token = await GetToken(request)

        return NextResponse.json({
            message: 'Token',
            token
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}