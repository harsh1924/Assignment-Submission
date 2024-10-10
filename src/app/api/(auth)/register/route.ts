import bcryptjs from 'bcryptjs'
import userModel from "@/app/server/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connectToDB from '@/app/server/dbConfig/dbConfig';

connectToDB();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { name, email, password, type } = reqBody;

        // error handling
        if (!name || !password || !email) {
            return NextResponse.json({ error: 'Please provide all the details' }, { status: 400 })
        }

        // checking user exists or not
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return NextResponse.json({
                error: 'User already exists',
            }, { status: 400 })
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // checking the type of request. Is it for admin or user
        if (type == 'ADMIN') {
            // if admin creating admin account
            const user = new userModel({
                name,
                email,
                password: hashedPassword,
                role: 'ADMIN'
            });
            await user.save();
            return NextResponse.json({
                message: 'User created successfully',
                success: true,
                user
            }, { status: 201 });
        } else {
            // if user creating user account
            const user = new userModel({
                name,
                email,
                password: hashedPassword,

            });
            await user.save();
            return NextResponse.json({
                message: 'User created successfully',
                success: true,
                user
            }, { status: 201 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 401 })
    }
}