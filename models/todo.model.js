const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true
    },
    deadline: {
        type: String,
        required: true,
        default: "1 day"
    },
    status: {
        type: String,
        required: true,
        default: "PENDING",
        enum: ["PENDING","COMPLETED"]
    }
},{timestamps: true,versionKey: false})

module.exports=mongoose.model("task",todoSchema)