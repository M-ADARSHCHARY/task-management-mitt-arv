import React from "react";

function TaskCard({ task, updateStatus, deleteTask }) {
  const assignedUser = task?.assignedTo;
  console.log("assignedUser:", assignedUser);

  return (
    <div className="m-2 rounded-2xl border border-white/10 bg-slate-900 p-4 text-slate-100 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">{task.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
            {task.status}
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {assignedUser?.name || "Unassigned"}
        </span>
      </div>

      <div className="mt-3 text-sm text-slate-400">
        <p>
          <span className="text-slate-200">Email:</span> {assignedUser?.email || "N/A"}
        </p>
        <p>
          <span className="text-slate-200">Role:</span> {assignedUser?.role || "N/A"}
        </p>
      </div>

      {/* Move Button */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <select
          value={task.status}
          onChange={(e) => updateStatus(task._id, e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none"
        >
          <option value="Todo">Todo</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>
       
        <button
          className="hover:cursor-pointer rounded-xl bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-400"
          onClick={() => deleteTask(task._id)}
        >
          delete
        </button>
      </div>

      {/* History */}
      <details className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-200">
          View history
        </summary>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          {task?.history?.map((h, i) => (
            <p key={i} className="rounded-lg bg-slate-800 px-3 py-2">
              {h.status} - {new Date(h.time).toLocaleString()}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
}

export default TaskCard;
