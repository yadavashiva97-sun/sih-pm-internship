import express from "express";
import { Student } from "../models/Student.js";

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create student"
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
});

export default router;