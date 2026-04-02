import Task from "../models/model.tasks.js";


export const createTask = async (req, res) => {
    try {

        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newTask = new Task({
            title: req.body.title,
            history: [{ status: "Todo", time: new Date() }]
        });

        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
}


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({
            message: "Tasks retrieved successfully",
            tasks
        });
    } catch (err) {
        res.status(500).json(err);
    }
}


export const updateTaskStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const { taskId } = req.params;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        console.log("Current task status:", task.status);
        task.status = status;

        // Add history
        task.history.push({
            status: status,
            time: new Date()
        });

        await task.save();

        res.json({
            message: "Task status updated",
            task
        });
    } catch (err) {
        console.log("Error updating task status:", err);
        res.status(500).json(err);
    }
}


export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted Successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
}