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
    history: [
        {
            status: String,
            time: Date
        }
    ]
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
