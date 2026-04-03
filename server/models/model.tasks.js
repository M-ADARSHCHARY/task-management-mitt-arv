import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Todo"
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    
    history: [
        {
            status: String,
            time: Date
        }
    ]
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
