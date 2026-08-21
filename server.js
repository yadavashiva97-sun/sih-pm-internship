import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import internshipRoutes from "./routes/internshipRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use("/api/internships", internshipRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "PM Internship Assistant Backend is running"
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });