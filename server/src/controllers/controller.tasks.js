import Task from "../models/model.tasks.js";
import User from "../models/model.users.js";
import mongoose from "mongoose";


export const createTask = async (req, res) => {
    try {

        const { title, assignedTo } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
            return res.status(400).json({ message: "Invalid assigned user id" });
        }

        const user = await User.findById(assignedTo);
        if (!user) {
            return res.status(404).json({ message: "Assigned user not found" });
        }


        const newTask = new Task({
            title: title,
            assignedTo: assignedTo,
            history: [{ status: "Todo", time: new Date() }]
        });

        const savedTask = await newTask.save();
        await savedTask.populate("assignedTo", "name email role");
        res.status(201).json({ 
            message: "Task created successfully",
            task: savedTask
         });
    } catch (err) {
        res.status(500).json(err);
    }
}


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email role");
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