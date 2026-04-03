import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";
import toast from "react-hot-toast";

export const getTasksThunk = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tasks");
      return res.data?.tasks || [];
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to fetch tasks";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/tasks", taskData);
      toast.success(res.data?.message || "Task created successfully");
      return res.data?.task;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to create task";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const updateTaskStatusThunk = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/tasks/${id}`, { status: newStatus });
      toast.success(res.data?.message || "Task updated successfully");
      return {
        id,
        newStatus,
        history: res.data?.task?.history || [],
      };
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to update task";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/tasks/${taskId}`);
      toast.success(res.data?.message || "Task deleted successfully");
      return taskId;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to delete task";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);
