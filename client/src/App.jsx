import React, { useEffect, useState } from "react";
import Column from "./components/Column";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk, getUsersThunk } from "./store/user/userThunk";
import { createTaskThunk, getTasksThunk } from "./store/task/taskThunk";

function App() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Developer",
    active: true,
  });

  useEffect(() => {
    dispatch(getTasksThunk());
    dispatch(getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedUserId && users.length > 0) {
      setSelectedUserId(users[0]._id);
    }
  }, [users, selectedUserId]);

  const handleUserFormChange = (field, value) => {
    setUserForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createUser = async () => {
    try {
      if (!userForm.name.trim() || !userForm.email.trim()) {
        toast.error("Name and email are required");
        return;
      }

      await dispatch(createUserThunk({
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        active: userForm.active,
      })).unwrap();

      setUserForm({
        name: "",
        email: "",
        role: "Developer",
        active: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title || !selectedUserId) {
      toast.error("Task title and assignee are required");
      return;
    }

    try {
      await dispatch(createTaskThunk({
        title,
        assignedTo: selectedUserId,
      })).unwrap();
      setTitle("");

    } catch (err) {
      console.log(err);
    }
  };

  // Group tasks
  const todo = tasks?.filter((t) => t.status === "Todo");
  const inProgress = tasks?.filter((t) => t.status === "InProgress");
  const done = tasks?.filter((t) => t.status === "Done");
  const selectedUserName = users.find((user) => user._id === selectedUserId)?.name || "All users";
  const selectedUserRole = users.find((user) => user._id === selectedUserId)?.role || "NA";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl p-6 lg:p-10">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
            Project Management Utility
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
            Manage users, assign tasks, move work across SDLC phases, and inspect task history on demand.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <p className="mt-2 text-3xl font-bold">{tasks.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Users</p>
            <p className="mt-2 text-3xl font-bold">{users.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Selected View</p>
            <p className="mt-2 text-2xl font-bold">{selectedUserName} - {selectedUserRole}</p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Create User</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-sky-400"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) => handleUserFormChange("name", e.target.value)}
              />
              <input
                className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-sky-400"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => handleUserFormChange("email", e.target.value)}
              />
              <select
                className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400"
                value={userForm.role}
                onChange={(e) => handleUserFormChange("role", e.target.value)}
              >
                <option>Developer</option>
                <option>Tester</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
              <label className="flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={userForm.active}
                  onChange={(e) => handleUserFormChange("active", e.target.checked)}
                />
                Active user
              </label>
            </div>
            <button
              onClick={createUser}
              className="cursor-pointer mt-4 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-500"
            >
              Add User
            </button>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Create Task</h2>
            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-sky-400"
                placeholder="Enter task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select assignee</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} - {user.role}
                  </option>
                ))}
              </select>
              <button
                onClick={addTask}
                className="cursor-pointer rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!title || !selectedUserId}
              >
                Add Task
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Current assignee: <span className="text-slate-800">{selectedUserName}</span>
            </p>
          </section>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Task Board</h2>
          <p className="text-sm text-slate-500">Showing tasks assigned across SDLC phases</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Column title="Product Backlog" tasks={todo} />
          <Column title="In Progress" tasks={inProgress} />
          <Column title="Done" tasks={done} />
        </div>
      </div>
    </div>
  );
}

export default App;