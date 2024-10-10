import { Schema, model, models } from "mongoose";

const assignmentSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'Please provide user name'],
    },
    adminName: {
        type: String,
        required: [true, 'Please provide admin name'],
    },
    admin: {
        type: String,
        required: [true, "Please provide admin name"],
    },
    userId: String,
    assignmentText: {
        type: String,
        required: [true, 'Please provide assignment'],
    },
    isRejected: {
        type: String,
        default: '1',
        enum: ['1', '2', '3']
    }
}, {
    timestamps: true
})

const assignmentModel = models.assignments || model('assignments', assignmentSchema)

export default assignmentModel