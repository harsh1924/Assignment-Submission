import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide email"],
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        select: false,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

}, {
    timestamps: true
})

const userModel = models.user || model('user', userSchema)

export default userModel