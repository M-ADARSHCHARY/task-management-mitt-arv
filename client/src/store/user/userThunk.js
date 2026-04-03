import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";
import toast from "react-hot-toast";


// 🔹 GET USERS
export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users");
      return res.data.users;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to fetch users";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);


// 🔹 CREATE USER
export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users", userData);
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to create user";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);


// 🔹 DELETE USER
export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/users/${userId}`);
      toast.success(res.data.message);
      return userId;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to delete user";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);