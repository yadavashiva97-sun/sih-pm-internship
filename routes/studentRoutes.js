import express from "express";
import { Student } from "../models/Student.js";

const router = express.Router();

// ==========================================
// TEST STUDENT API
// ==========================================
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Student API is working"
    });
});

// ==========================================
// CREATE / SAVE STUDENT
// ==========================================
router.post("/", async (req, res) => {
    try {
        console.log("=================================");
        console.log("CREATE STUDENT REQUEST");
        console.log("BODY:", req.body);
        console.log("=================================");

        const student = await Student.create(req.body);

        console.log("STUDENT CREATED:", student._id);

        res.status(201).json({
            success: true,
            message: "Student profile created successfully",
            student
        });

    } catch (error) {
        console.error("=================================");
        console.error("CREATE STUDENT ERROR:", error);
        console.error("ERROR MESSAGE:", error.message);
        console.error("=================================");

        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
});

// ==========================================
// GET ALL STUDENTS
// ==========================================
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        console.error("GET STUDENTS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message
        });
    }
});

export default router;