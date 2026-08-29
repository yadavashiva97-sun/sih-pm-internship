import express from "express";
import { Student } from "../models/Student.js";

const router = express.Router();

/* =========================================================
   TEST
========================================================= */

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Students API working"
    });
});


/* =========================================================
   GET ALL STUDENTS
========================================================= */

router.get("/", async (req, res) => {
    try {

        const students = await Student.find();

        res.json({
            success: true,
            students
        });

    } catch (error) {

        console.error("Get students error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch students"
        });
    }
});


/* =========================================================
   CREATE STUDENT
========================================================= */

router.post("/", async (req, res) => {
    try {

        const student =
            await Student.create(req.body);

        res.status(201).json({
            success: true,
            student
        });

    } catch (error) {

        console.error("Create student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create student"
        });
    }
});


/* =========================================================
   UPDATE STUDENT
========================================================= */

router.put("/:id", async (req, res) => {
    try {

        const student =
            await Student.findByIdAndUpdate(
                req.params.id,
                req.body,
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
            student
        });

    } catch (error) {

        console.error("Update student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update student"
        });
    }
});


/* =========================================================
   GET STUDENT BY ID
========================================================= */

router.get("/:id", async (req, res) => {
    try {

        const student =
            await Student.findById(req.params.id);

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

        console.error("Get student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch student"
        });
    }
});


export default router;