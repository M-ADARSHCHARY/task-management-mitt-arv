import { createSlice } from "@reduxjs/toolkit";
import {
  createTaskThunk,
  deleteTaskThunk,
  getTasksThunk,
  updateTaskStatusThunk,
} from "./taskThunk";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  deletingTaskId: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTaskThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.tasks.push(action.payload);
        }
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTaskStatusThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTaskStatusThunk.fulfilled, (state, action) => {
        const { id, newStatus, history } = action.payload;
        state.tasks = state.tasks.map((task) =>
          task._id === id ? { ...task, status: newStatus, history } : task
        );
      })
      .addCase(updateTaskStatusThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTaskThunk.pending, (state, action) => {
        state.error = null;
        state.deletingTaskId = action.meta.arg;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.deletingTaskId = null;
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.deletingTaskId = null;
      });
  },
});

export default taskSlice.reducer;
