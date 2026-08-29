import express from "express";
import { Student } from "../models/Student.js";

const router = express.Router();

// TEST STUDENT API
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Student API is working"
    });
});

// CREATE STUDENT
router.post("/", async (req, res) => {
    try {
        console.log("Student request:", req.body);

        const student = await Student.create(req.body);

        console.log("Student created:", student._id);

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student
        });

    } catch (error) {
        console.error("CREATE STUDENT ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
});

export default router;