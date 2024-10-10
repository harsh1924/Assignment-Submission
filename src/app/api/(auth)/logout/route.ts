import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: 'Logout Successfull',
            success: true
        });
        
        // setitin token value to empty string
        response.cookies.set("token", "", { httpOnly: true });
        return response;
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}