import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskThunk, updateTaskStatusThunk } from "../store/task/taskThunk";

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const {deletingTaskId} = useSelector((state) => state.tasks);
  const assignedUser = task?.assignedTo;
  const isDeleting = deletingTaskId === task._id;
  const displayStatus = task.status === "Todo" ? "Product Backlog" : task.status;

  const handleStatusChange = (newStatus) => {
    dispatch(updateTaskStatusThunk({ id: task._id, newStatus }));
  };

  const handleDelete = () => {
    dispatch(deleteTaskThunk(task._id));
  };

  return (
    <div className="m-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">{task.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sky-700">
            {displayStatus}
          </p>
        </div>
        <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600">
          {assignedUser?.name || "Unassigned"}
        </span>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        <p>
          <span className="text-slate-800">Email:</span> {assignedUser?.email || "N/A"}
        </p>
        <p>
          <span className="text-slate-800">Role:</span> {assignedUser?.role || "N/A"}
        </p>
      </div>

      {/* Move Button */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="Todo">Product Backlog</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>
       
        <button
          className="hover:cursor-pointer rounded-xl bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "delete"}
        </button>
      </div>

      {/* History */}
      <details className="mt-4 rounded-xl border border-slate-300 bg-white p-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          View history
        </summary>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          {task?.history?.map((h, i) => (
            <p key={i} className="rounded-lg bg-slate-100 px-3 py-2">
              {h.status} - {new Date(h.time).toLocaleString()}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
}

export default TaskCard;
