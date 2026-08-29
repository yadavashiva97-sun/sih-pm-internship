import express from "express";
import mongoose from "mongoose";

import { Application } from "../models/Application.js";
import { Student } from "../models/Student.js";
import { Internship } from "../models/Internship.js";

const router = express.Router();

// =====================================================
// TEST
// =====================================================

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Application API is working"
    });
});

// =====================================================
// APPLY
// =====================================================

router.post("/", async (req, res) => {
    try {
        const {
            studentId,
            internshipId
        } = req.body;

        if (
            !studentId ||
            !internshipId
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Student ID and internship ID are required"
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(
                studentId
            ) ||
            !mongoose.Types.ObjectId.isValid(
                internshipId
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid student or internship ID"
            });
        }

        const student =
            await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const internship =
            await Internship.findById(
                internshipId
            );

        if (!internship) {
            return res.status(404).json({
                success: false,
                message:
                    "Internship not found"
            });
        }

        const existing =
            await Application.findOne({
                studentId,
                internshipId
            });

        if (existing) {
            return res.status(409).json({
                success: false,
                message:
                    "You have already applied for this internship",
                application: existing
            });
        }

        const application =
            await Application.create({
                studentId,
                internshipId,

                studentName:
                    student.name,

                internshipTitle:
                    internship.title,

                company:
                    internship.company,

                status: "Applied"
            });

        res.status(201).json({
            success: true,
            message:
                "Application submitted successfully",
            application
        });
    } catch (error) {
        console.error(
            "Application error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to submit application",
            error: error.message
        });
    }
});

// =====================================================
// STUDENT APPLICATIONS
// =====================================================

router.get(
    "/student/:studentId",
    async (req, res) => {
        try {
            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.studentId
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid student ID"
                });
            }

            const applications =
                await Application.find({
                    studentId:
                        req.params.studentId
                })
                    .populate("internshipId")
                    .sort({
                        createdAt: -1
                    });

            res.json({
                success: true,
                count: applications.length,
                applications
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    "Failed to fetch applications",
                error: error.message
            });
        }
    }
);

// =====================================================
// ALL APPLICATIONS
// =====================================================

router.get("/", async (req, res) => {
    try {
        const applications =
            await Application.find()
                .populate("studentId")
                .populate("internshipId")
                .sort({
                    createdAt: -1
                });

        res.json({
            success: true,
            count: applications.length,
            applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                "Failed to fetch applications",
            error: error.message
        });
    }
});

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

router.put("/:id", async (req, res) => {
    try {
        const {
            status
        } = req.body;

        const allowedStatuses = [
            "Applied",
            "Under Review",
            "Shortlisted",
            "Rejected",
            "Selected"
        ];

        if (
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid application status"
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid application ID"
            });
        }

        const application =
            await Application.findByIdAndUpdate(
                req.params.id,
                { status },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!application) {
            return res.status(404).json({
                success: false,
                message:
                    "Application not found"
            });
        }

        res.json({
            success: true,
            message:
                "Application status updated",
            application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                "Failed to update application",
            error: error.message
        });
    }
});

export default router;