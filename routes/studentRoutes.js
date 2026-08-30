import express from "express";
import mongoose from "mongoose";
import { Student } from "../models/Student.js";

const router = express.Router();

/* =====================================================
   TEST
===================================================== */

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Student API is working"
    });
});

/* =====================================================
   GET ALL STUDENTS
===================================================== */

router.get("/", async (req, res) => {
    try {
        const students = await Student.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        console.error("Get students error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message
        });
    }
});

/* =====================================================
   GET ONE STUDENT
===================================================== */

router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch student",
            error: error.message
        });
    }
});

/* =====================================================
   CREATE STUDENT
===================================================== */

router.post("/", async (req, res) => {
    try {
        const {
            name,
            email,
            college,
            course,
            branch,
            semester,
            cgpa,
            skills,
            interests,
            location,
            education
        } = req.body;

        if (!name || !email || !college) {
            return res.status(400).json({
                success: false,
                message: "Name, email and college are required"
            });
        }

        const cleanEmail = String(email)
            .trim()
            .toLowerCase();

        const existingStudent = await Student.findOne({
            email: cleanEmail
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "A student with this email already exists",
                student: existingStudent
            });
        }

        const student = await Student.create({
            name: String(name).trim(),
            email: cleanEmail,

            college:
                String(college).trim() || "Not specified",

            course:
                String(course || "B.Tech").trim(),

            branch:
                String(branch || "Not specified").trim(),

            semester:
                String(semester || "Not specified").trim(),

            cgpa:
                Number(cgpa) || 0,

            skills:
                Array.isArray(skills)
                    ? skills
                    : [],

            interests:
                Array.isArray(interests)
                    ? interests
                    : [],

            location:
                String(location || "Any").trim(),

            education:
                String(education || "Not specified").trim()
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student
        });

    } catch (error) {
        console.error("Create student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
});

/* =====================================================
   UPDATE STUDENT
===================================================== */

router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const updates = {
            ...req.body
        };

        if (updates.email) {
            updates.email = String(updates.email)
                .trim()
                .toLowerCase();
        }

        if (updates.skills && !Array.isArray(updates.skills)) {
            updates.skills = String(updates.skills)
                .split(",")
                .map(x => x.trim())
                .filter(Boolean);
        }

        if (
            updates.interests &&
            !Array.isArray(updates.interests)
        ) {
            updates.interests = String(updates.interests)
                .split(",")
                .map(x => x.trim())
                .filter(Boolean);
        }

        if (updates.cgpa !== undefined) {
            updates.cgpa = Number(updates.cgpa) || 0;
        }

        const student =
            await Student.findByIdAndUpdate(
                req.params.id,
                updates,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        console.error("Update student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update student",
            error: error.message
        });
    }
});

/* =====================================================
   DELETE STUDENT
===================================================== */

router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student =
            await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete student",
            error: error.message
        });
    }
});

export default router;