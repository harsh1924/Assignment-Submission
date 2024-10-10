import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const GetIdFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        if (token != '') {
            const decodedToken: any = jwt.verify(token, `GrowthXSECRETkey$123`)
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