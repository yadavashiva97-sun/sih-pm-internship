import express from "express";
import mongoose from "mongoose";
import { Student } from "../models/Student.js";

const router = express.Router();

// TEST
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Student API is working"
    });
});

// CREATE / SAVE STUDENT
router.post("/", async (req, res) => {
    try {
        console.log("CREATE STUDENT REQUEST");
        console.log(req.body);

        const body = req.body || {};

        const name = String(body.name || "").trim();

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Student name is required"
            });
        }

        const skills = Array.isArray(body.skills)
            ? body.skills
                .map(skill => String(skill).trim())
                .filter(Boolean)
            : [];

        const interests = Array.isArray(body.interests)
            ? body.interests
                .map(interest => String(interest).trim())
                .filter(Boolean)
            : [];

        if (skills.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please add at least one skill"
            });
        }

        if (interests.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please add at least one career interest"
            });
        }

        let cgpa = 0;

        if (
            body.cgpa !== undefined &&
            body.cgpa !== null &&
            body.cgpa !== ""
        ) {
            cgpa = Number(body.cgpa);

            if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > 10) {
                return res.status(400).json({
                    success: false,
                    message: "CGPA must be between 0 and 10"
                });
            }
        }

        const studentData = {
            name,
            college: String(body.college || "Not specified").trim(),
            course: String(body.course || "B.Tech").trim(),
            branch: String(body.branch || "CSE").trim(),
            semester: String(body.semester || "3rd Semester").trim(),
            cgpa,
            skills: [...new Set(skills)],
            interests: [...new Set(interests)],
            location: String(body.location || "Any").trim(),
            education: String(body.education || "B.Tech CSE").trim()
        };

        let student = await Student.findOne({ name });

        if (student) {
            Object.assign(student, studentData);
            await student.save();

            return res.json({
                success: true,
                message: "Student profile updated successfully",
                student
            });
        }

        student = await Student.create(studentData);

        return res.status(201).json({
            success: true,
            message: "Student profile created successfully",
            student
        });

    } catch (error) {
        console.error("CREATE STUDENT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
});

// GET ALL STUDENTS
router.get("/", async (req, res) => {
    try {
        const students = await Student.find().sort({
            createdAt: -1
        });

        res.json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message
        });
    }
});

// GET ONE STUDENT
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

// EXPORT
export default router;