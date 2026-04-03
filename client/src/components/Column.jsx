import React from "react";
import TaskCard from "./TaskCard";

function Column({ title, tasks, updateStatus, deleteTask }) {
  const taskList = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="h-fit self-start rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/10 backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-100">{title}</h2>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
          {taskList.length}
        </span>
      </div>

      {taskList.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 bg-slate-900/60 p-4 text-sm text-slate-400">
          No tasks in this phase.
        </p>
      ) : (
        taskList.map((task) => (
          <TaskCard key={task._id} task={task} updateStatus={updateStatus} deleteTask={deleteTask} />
        ))
      )}
    </div>
  );
}

export default Column;