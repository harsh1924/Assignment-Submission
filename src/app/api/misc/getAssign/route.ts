import assignmentModel from "@/app/server/models/assignmentModel";

export async function GET() {
    try {
        const assignments = await assignmentModel.find({
            
        })
    } catch (error: any) {
        
    }
}