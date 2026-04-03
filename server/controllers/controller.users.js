import User from "../models/model.users.js";

export const createUser = async (req, res) => {
	try {
		const { name, email, role, active } = req.body;

		if (!name || !email) {
			return res.status(400).json({ message: "Name and email are required" });
		}

		const normalizedEmail = email.toLowerCase().trim();
		const existingUser = await User.findOne({ email: normalizedEmail });
		if (existingUser) {
			return res.status(409).json({ message: "User with this email already exists" });
		}

		const user = await User.create({
			name,
			email: normalizedEmail,
			role,
			active
		});

		return res.status(201).json({ message: "User created successfully", user });
	} catch (err) {
		return res.status(500).json({ message: "Failed to create user", error: err.message });
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find().sort({ createdAt: -1 });
		return res.status(200).json({ message: "Users fetched successfully", users });
	} catch (err) {
		return res.status(500).json({ message: "Failed to fetch users", error: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Failed to delete user", error: err.message });
	}
};
