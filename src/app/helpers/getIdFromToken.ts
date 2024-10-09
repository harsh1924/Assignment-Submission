import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const GetIdFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        if (token != '') {
            const decodedToken: any = jwt.verify(token, `${process.env.JWT_SECRET!}`)
            console.log(decodedToken.id);

            return decodedToken.id
        }
        return NextResponse.json({
            message: 'Data Extracted',
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}