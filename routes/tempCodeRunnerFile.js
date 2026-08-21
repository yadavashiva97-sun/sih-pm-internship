import express from "express";
import { Internship } from "../models/Internship.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const internships = await Internship.find();

        res.json(internships);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch internships"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const internship = await Internship.create(req.body);

        res.status(201).json(internship);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create internship"
        });
    }
});

export default router;