import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance.js";
import Column from "./components/Column";
import toast from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Developer",
    active: true,
  });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      const taskList = Array.isArray(res.data) ? res.data : res.data?.tasks;
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (err) {
      console.log(err);
      setTasks([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      const userList = Array.isArray(res.data) ? res.data : res.data?.users;
      setUsers(Array.isArray(userList) ? userList : []);
      if (!selectedUserId && Array.isArray(userList) && userList.length > 0) {
        setSelectedUserId(userList[0]._id);
      }
    } catch (err) {
      console.log(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

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

      await axiosInstance.post("/users", {
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        active: userForm.active,
      });

      setUserForm({
        name: "",
        email: "",
        role: "Developer",
        active: true,
      });
      fetchUsers();
      toast.success("User created successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to create user");
    }
  };

  // Add task
  const addTask = async () => {
    if (!title || !selectedUserId) {
      toast.error("Task title and assignee are required");
      return;
    }

    try {
      const result = await axiosInstance.post("/tasks", {
        title,
        assignedTo: selectedUserId,
      });
      setTitle("");
      const newTask = result.data.task;

      setTasks((prev) => [...prev, newTask]);
      toast.success("Task created successfully");

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to create task");
    }
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const result = await axiosInstance.patch(`/tasks/${id}`, {
        status: newStatus,
      });
      // fetchTasks(); // to-do: Avoid making an extra API call. Instead, update the local state directly.
      const updatedTask = result.data.task;

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus, history: updatedTask.history } : t))
      );
      toast.success("Task updated successfully");

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete task");
    }
  }

  // Group tasks
  const todo = tasks?.filter((t) => t.status === "Todo");
  const inProgress = tasks?.filter((t) => t.status === "InProgress");
  const done = tasks?.filter((t) => t.status === "Done");
  const selectedUserName = users.find((user) => user._id === selectedUserId)?.name || "All users";
  const selectedUserRole = users.find((user) => user._id === selectedUserId)?.role || "NA";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl p-6 lg:p-10">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Internship Assignment</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
            Project Management Utility
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Manage users, assign tasks, move work across SDLC phases, and inspect task history on demand.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Total Tasks</p>
            <p className="mt-2 text-3xl font-bold">{tasks.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Users</p>
            <p className="mt-2 text-3xl font-bold">{users.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Selected View</p>
            <p className="mt-2 text-2xl font-bold">{selectedUserName} - {selectedUserRole}</p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <h2 className="text-xl font-semibold">Create User</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) => handleUserFormChange("name", e.target.value)}
              />
              <input
                className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => handleUserFormChange("email", e.target.value)}
              />
              <select
                className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
                value={userForm.role}
                onChange={(e) => handleUserFormChange("role", e.target.value)}
              >
                <option>Developer</option>
                <option>Tester</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300">
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
              className="cursor-pointer mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Add User
            </button>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <h2 className="text-xl font-semibold">Create Task</h2>
            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500"
                placeholder="Enter task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
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
                className="cursor-pointer rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!title || !selectedUserId}
              >
                Add Task
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Current assignee: <span className="text-slate-200">{selectedUserName}</span>
            </p>
          </section>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Task Board</h2>
          <p className="text-sm text-slate-400">Showing tasks assigned across SDLC phases</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Column title="Todo" tasks={todo} updateStatus={updateStatus} deleteTask={deleteTask} />
          <Column title="In Progress" tasks={inProgress} updateStatus={updateStatus} deleteTask={deleteTask} />
          <Column title="Done" tasks={done} updateStatus={updateStatus} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
}

export default App;