import express from "express";
import { createTask, deleteTask, getAllTasks, updateTaskStatus } from "../controllers/controller.tasks.js";
const router = express.Router();



// CREATE TASK
router.post("/tasks", createTask);


// GET ALL TASKS
router.get("/tasks", getAllTasks);


// UPDATE TASK STATUS ( IMPORTANT)
router.patch("/tasks/:taskId", updateTaskStatus);


// DELETE TASK
router.delete("/tasks/:taskId", deleteTask);

export default router;