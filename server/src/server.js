import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../DB/db.js';
import taskRoutes from '../routes/route.tasks.js';
import userRoutes from '../routes/route.users.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);
app.use("/api", userRoutes);




// Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});