import express from "express";
import mongoose from "mongoose";
import { Student } from "../models/Student.js";

const router = express.Router();

// =====================================================
// TEST
// =====================================================

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Student API is working"
    });
});

// =====================================================
// CREATE / SAVE STUDENT
// =====================================================

router.post("/", async (req, res) => {
    try {
        console.log("=================================");
        console.log("CREATE STUDENT REQUEST");
        console.log("BODY:", req.body);
        console.log("=================================");

        const body = req.body || {};

        const name = String(body.name || "").trim();

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Student name is required"
            });
        }

        // -------------------------------------------------
        // SKILLS
        // -------------------------------------------------

        let skills = [];

        if (Array.isArray(body.skills)) {
            skills = body.skills
                .map(skill => String(skill).trim())
                .filter(Boolean);
        }

        skills = [...new Set(skills)];

        if (skills.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please add at least one skill"
            });
        }

        // -------------------------------------------------
        // INTERESTS
        // -------------------------------------------------

        let interests = [];

        if (Array.isArray(body.interests)) {
            interests = body.interests
                .map(interest => String(interest).trim())
                .filter(Boolean);
        }

        interests = [...new Set(interests)];

        if (interests.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please add at least one career interest"
            });
        }

        // -------------------------------------------------
        // CGPA
        // -------------------------------------------------

        let cgpa = 0;

        if (
            body.cgpa !== undefined &&
            body.cgpa !== null &&
            body.cgpa !== ""
        ) {
            cgpa = Number(body.cgpa);

            if (!Number.isFinite(cgpa)) {
                return res.status(400).json({
                    success: false,
                    message: "CGPA must be a valid number"
                });
            }

            if (cgpa < 0 || cgpa > 10) {
                return res.status(400).json({
                    success: false,
                    message: "CGPA must be between 0 and 10"
                });
            }
        }

        // -------------------------------------------------
        // OTHER FIELDS
        // -------------------------------------------------

        const college = String(body.college || "").trim();
        const course = String(body.course || "B.Tech").trim();
        const branch = String(body.branch || "CSE").trim();
        const semester = String(body.semester || "3rd Semester").trim();
        const location = String(body.location || "Any").trim();
        const education = String(
            body.education || "B.Tech CSE"
        ).trim();

        // -------------------------------------------------
        // STUDENT DATA
        // -------------------------------------------------

        const studentData = {
            name,
            college,
            course,
            branch,
            semester,
            cgpa,
            skills,
            interests,
            location,
            education
        };

        console.log("STUDENT DATA TO SAVE:");
        console.log(studentData);

        // -------------------------------------------------
        // FIND EXISTING STUDENT BY NAME
        // -------------------------------------------------

        let student = await Student.findOne({ name });

        // -------------------------------------------------
        // UPDATE EXISTING STUDENT
        // -------------------------------------------------

        if (student) {
            student.name = name;
            student.college = college;
            student.course = course;
            student.branch = branch;
            student.semester = semester;
            student.cgpa = cgpa;
            student.skills = skills;
            student.interests = interests;
            student.location = location;
            student.education = education;

            await student.save();

            console.log(
                "EXISTING STUDENT UPDATED:",
                student._id
            );

            return res.status(200).json({
                success: true,
                message: "Student profile updated successfully",
                student
            });
        }

        // -------------------------------------------------
        // CREATE NEW STUDENT
        // -------------------------------------------------

        student = await Student.create(studentData);

        console.log(
            "NEW STUDENT CREATED:",
            student._id
        );

        return res.status(201).json({
            success: true,
            message: "Student profile created successfully",
            student
        });

    } catch (error) {
        console.error("=================================");
        console.error("CREATE STUDENT ERROR");
        console.error(error);
        console.error("MESSAGE:", error.message);
        console.error("=================================");

        return res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
});

// =====================================================
// GET ALL STUDENTS
// =====================================================

router.get("/", async (req, res) => {
    try {
        const students = await Student.find()
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        console.error("GET STUDENTS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message
        });
    }
});

// =====================================================
// SEARCH STUDENTS
// =====================================================

router.get("/search", async (req, res) => {
    try {
        const {
            skill,
            interest,
            location
        } = req.query;

        const students = await Student.find();

        const results = students.filter(student => {

            const skills = student.skills || [];
            const interests = student.interests || [];

            const studentLocation =
                String(student.location || "")
                    .toLowerCase();

            const skillMatch =
                !skill ||
                skills.some(item =>
                    String(item)
                        .toLowerCase()
                        .includes(
                            String(skill).toLowerCase()
                        )
                );

            const interestMatch =
                !interest ||
                interests.some(item =>
                    String(item)
                        .toLowerCase()
                        .includes(
                            String(interest).toLowerCase()
                        )
                );

            const locationMatch =
                !location ||
                studentLocation.includes(
                    String(location).toLowerCase()
                );

            return (
                skillMatch &&
                interestMatch &&
                locationMatch
            );
        });

        return res.json({
            success: true,
            count: results.length,
            students: results
        });

    } catch (error) {
        console.error(
            "SEARCH STUDENTS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to search candidates",
            error: error.message
        });
    }
});

// =====================================================
// GET ONE STUDENT
// =====================================================

router.get("/:id", async (req, res) => {
    try {
        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student =
            await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.json({
            success: true,
            student
        });

    } catch (error) {
        console.error(
            "GET STUDENT ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch student",
            error: error.message
        });
    }
});

// =====================================================
// UPDATE STUDENT
// =====================================================

router.put("/:id", async (req, res) => {
    try {
        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const body = req.body || {};
        const updateData = {};

        if (body.name !== undefined) {
            updateData.name =
                String(body.name).trim();
        }

        if (body.college !== undefined) {
            updateData.college =
                String(body.college).trim();
        }

        if (body.course !== undefined) {
            updateData.course =
                String(body.course).trim();
        }

        if (body.branch !== undefined) {
            updateData.branch =
                String(body.branch).trim();
        }

        if (body.semester !== undefined) {
            updateData.semester =
                String(body.semester).trim();
        }

        if (body.education !== undefined) {
            updateData.education =
                String(body.education).trim();
        }

        if (body.location !== undefined) {
            updateData.location =
                String(body.location).trim();
        }

        if (body.cgpa !== undefined) {
            const cgpa = Number(body.cgpa);

            if (!Number.isFinite(cgpa)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid CGPA"
                });
            }

            if (cgpa < 0 || cgpa > 10) {
                return res.status(400).json({
                    success: false,
                    message: "CGPA must be between 0 and 10"
                });
            }

            updateData.cgpa = cgpa;
        }

        if (Array.isArray(body.skills)) {
            updateData.skills = [
                ...new Set(
                    body.skills
                        .map(skill =>
                            String(skill).trim()
                        )
                        .filter(Boolean)
                )
            ];
        }

        if (Array.isArray(body.interests)) {
            updateData.interests = [
                ...new Set(
                    body.interests
                        .map(interest =>
                            String(interest).trim()
                        )
                        .filter(Boolean)
                )
            ];
        }

        const student =
            await Student.findByIdAndUpdate(
                req.params.id,
                updateData,
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

        return res.json({
            success: true,
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        console.error(
            "UPDATE STUDENT ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update student",
            error: error.message
        });
    }
});

// =====================================================
// DELETE STUDENT
// =====================================================

router.delete("/:id", async (req, res) => {
    try {
        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student =
            await Student.findByIdAndDelete(
                req.params.id
            );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        console.error(
            "DELETE STUDENT ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete student",
            error: error.message
        });
    }
});

// =====================================================
// EXPORT
// =====================================================

export default router;