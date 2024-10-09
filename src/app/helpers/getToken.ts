import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GetToken = (request: NextRequest) => {
    try {
        const cookie = cookies()
        const token = cookie.get('token')?.value || ''
        return JSON.stringify(token);
        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}