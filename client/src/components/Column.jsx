import React from "react";
import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  const taskList = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="h-fit self-start rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {taskList.length}
        </span>
      </div>

      {taskList.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          No tasks in this phase.
        </p>
      ) : (
        taskList.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      )}
    </div>
  );
}

export default Column;