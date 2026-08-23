import express from "express";

import { Internship } from "../models/Internship.js";
import { Student } from "../models/Student.js";

const router = express.Router();

console.log("Internship routes loading");

// =====================================================
// SEARCH INTERNSHIPS
// =====================================================

router.get("/search", async (req, res) => {
    try {
        const {
            interest,
            location,
            skill
        } = req.query;

        const filter = {};

        if (interest) {
            filter.interest = {
                $regex: interest,
                $options: "i"
            };
        }

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (skill) {
            filter.skills = {
                $elemMatch: {
                    $regex: skill,
                    $options: "i"
                }
            };
        }

        const internships = await Internship.find(filter);

        res.json(internships);
    }
    catch (error) {
        console.log(
            "Search error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to search internships"
        });
    }
});

// =====================================================
// GET ALL INTERNSHIPS
// =====================================================

router.get("/", async (req, res) => {
    try {
        const internships =
            await Internship.find();

        res.json(internships);
    }
    catch (error) {
        console.log(
            "Fetch internships error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch internships"
        });
    }
});

// =====================================================
// MATCH INTERNSHIPS FOR STUDENT
// =====================================================

router.get("/match/:studentId", async (req, res) => {
    try {

        // -------------------------------------------------
        // FIND STUDENT
        // -------------------------------------------------

        const student =
            await Student.findById(
                req.params.studentId
            );

        if (!student) {
            return res.status(404).json({
                message:
                    "Student not found"
            });
        }

        // -------------------------------------------------
        // GET ALL INTERNSHIPS
        // -------------------------------------------------

        const internships =
            await Internship.find();

        // -------------------------------------------------
        // STUDENT DATA
        // -------------------------------------------------

        const studentSkills =
            Array.isArray(student.skills)
                ? student.skills
                : [];

        const studentInterests =
            Array.isArray(student.interests)
                ? student.interests
                : [];

        const studentLocation =
            String(
                student.location || ""
            )
                .trim()
                .toLowerCase();

        // -------------------------------------------------
        // EDUCATION
        // -------------------------------------------------

        const studentEducation =
            Array.isArray(student.education)
                ? student.education
                : student.education
                    ? [student.education]
                    : [];

        // -------------------------------------------------
        // CALCULATE MATCH FOR EACH INTERNSHIP
        // -------------------------------------------------

        const recommendations =
            internships
                .map((internship) => {

                    // =============================================
                    // INTERNSHIP SKILLS
                    // =============================================

                    const internshipSkills =
                        Array.isArray(
                            internship.skills
                        )
                            ? internship.skills
                            : [];

                    // =============================================
                    // SKILL MATCH
                    // SKILLS = 50 POINTS
                    // =============================================

                    const matchedSkills =
                        internshipSkills.filter(
                            (internshipSkill) => {

                                const internshipSkillLower =
                                    String(internshipSkill)
                                        .trim()
                                        .toLowerCase();

                                return studentSkills.some(
                                    (studentSkill) => {

                                        const studentSkillLower =
                                            String(studentSkill)
                                                .trim()
                                                .toLowerCase();

                                        return (
                                            studentSkillLower ===
                                                internshipSkillLower ||

                                            studentSkillLower.includes(
                                                internshipSkillLower
                                            ) ||

                                            internshipSkillLower.includes(
                                                studentSkillLower
                                            )
                                        );
                                    }
                                );
                            }
                        );

                    let skillScore = 0;

                    if (
                        internshipSkills.length > 0
                    ) {
                        skillScore =
                            (
                                matchedSkills.length /
                                internshipSkills.length
                            ) * 50;
                    }

                    // =============================================
                    // INTEREST MATCH
                    // INTEREST = 20 POINTS
                    // =============================================

                    const internshipInterest =
                        String(
                            internship.interest || ""
                        )
                            .trim()
                            .toLowerCase();

                    const interestMatch =
                        studentInterests.some(
                            (interest) => {

                                const studentInterest =
                                    String(interest)
                                        .trim()
                                        .toLowerCase();

                                return (
                                    studentInterest ===
                                        internshipInterest ||

                                    studentInterest.includes(
                                        internshipInterest
                                    ) ||

                                    internshipInterest.includes(
                                        studentInterest
                                    )
                                );
                            }
                        );

                    const interestScore =
                        interestMatch
                            ? 20
                            : 0;

                    // =============================================
                    // EDUCATION MATCH
                    // EDUCATION = 15 POINTS
                    // =============================================

                    const internshipEducation =
                        Array.isArray(
                            internship.education
                        )
                            ? internship.education
                            : internship.education
                                ? [internship.education]
                                : [];

                    let educationMatch = false;

                    if (
                        studentEducation.length > 0 &&
                        internshipEducation.length > 0
                    ) {

                        educationMatch =
                            studentEducation.some(
                                (studentEdu) => {

                                    const studentEduLower =
                                        String(studentEdu)
                                            .trim()
                                            .toLowerCase();

                                    return internshipEducation.some(
                                        (internshipEdu) => {

                                            const internshipEduLower =
                                                String(internshipEdu)
                                                    .trim()
                                                    .toLowerCase();

                                            return (
                                                studentEduLower ===
                                                    internshipEduLower ||

                                                studentEduLower.includes(
                                                    internshipEduLower
                                                ) ||

                                                internshipEduLower.includes(
                                                    studentEduLower
                                                ) ||

                                                internshipEduLower ===
                                                    "any"
                                            );
                                        }
                                    );
                                }
                            );
                    }

                    const educationScore =
                        educationMatch
                            ? 15
                            : 0;

                    // =============================================
                    // LOCATION MATCH
                    // LOCATION = 15 POINTS
                    // =============================================

                    const internshipLocation =
                        String(
                            internship.location || ""
                        )
                            .trim()
                            .toLowerCase();

                    const locationMatch =
                        studentLocation ===
                            "any location" ||

                        studentLocation ===
                            "any" ||

                        studentLocation ===
                            internshipLocation ||

                        internshipLocation.includes(
                            studentLocation
                        ) ||

                        studentLocation.includes(
                            internshipLocation
                        ) ||

                        internshipLocation ===
                            "remote";

                    const locationScore =
                        locationMatch
                            ? 15
                            : 0;

                    // =============================================
                    // FINAL MATCH SCORE
                    // =============================================

                    const matchScore =
                        Math.min(
                            Math.round(
                                skillScore +
                                interestScore +
                                educationScore +
                                locationScore
                            ),
                            100
                        );

                    // =============================================
                    // MATCH REASONS
                    // =============================================

                    const reason = [];

                    if (
                        matchedSkills.length > 0
                    ) {
                        reason.push(
                            `Skills matched: ${matchedSkills.join(", ")}`
                        );
                    }

                    if (interestMatch) {
                        reason.push(
                            `Interest matched: ${internship.interest}`
                        );
                    }

                    if (educationMatch) {
                        reason.push(
                            "Education eligibility matched"
                        );
                    }

                    if (locationMatch) {
                        reason.push(
                            `Location matched: ${internship.location}`
                        );
                    }

                    // =============================================
                    // RETURN RESULT
                    // =============================================

                    return {
                        internship,
                        matchScore,
                        matchedSkills,
                        interestMatch,
                        educationMatch,
                        locationMatch,
                        reason
                    };
                })

                // Only show internships with at least
                // one matching component
                .filter(
                    (item) =>
                        item.matchScore > 0
                )

                // Highest score first
                .sort(
                    (a, b) =>
                        b.matchScore -
                        a.matchScore
                );

        // -------------------------------------------------
        // SEND RESPONSE
        // -------------------------------------------------

        res.json(
            recommendations
        );

    }
    catch (error) {

        console.log(
            "Matching error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to find matching internships"
        });
    }
});

// =====================================================
// CREATE INTERNSHIP
// =====================================================

router.post("/", async (req, res) => {
    try {

        const internship =
            await Internship.create(
                req.body
            );

        res.status(201).json(
            internship
        );

    }
    catch (error) {

        console.log(
            "Create internship error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to create internship",

            error:
                error.message
        });
    }
});

// =====================================================
// EXPORT ROUTER
// =====================================================

export default router;