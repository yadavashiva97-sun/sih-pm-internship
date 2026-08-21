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

        const internships =
            await Internship.find(filter);

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


        const internships =
            await Internship.find();


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


        const recommendations =
            internships

                .map((internship) => {

                    const internshipSkills =
                        Array.isArray(
                            internship.skills
                        )
                            ? internship.skills
                            : [];


                    // -----------------------------
                    // SKILL MATCH
                    // -----------------------------

                    const matchedSkills =
                        internshipSkills.filter(
                            (skill) => {

                                const internshipSkillLower =
                                    String(skill)
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


                    // -----------------------------
                    // INTEREST MATCH
                    // -----------------------------

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


                    // -----------------------------
                    // LOCATION MATCH
                    // -----------------------------

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


                    // -----------------------------
                    // SCORE
                    // -----------------------------

                    let skillScore = 0;

                    if (
                        internshipSkills.length > 0
                    ) {

                        skillScore =
                            (
                                matchedSkills.length /
                                internshipSkills.length
                            ) * 60;

                    }


                    const interestScore =
                        interestMatch
                            ? 25
                            : 0;


                    const locationScore =
                        locationMatch
                            ? 15
                            : 0;


                    const matchScore =
                        Math.min(
                            Math.round(
                                skillScore +
                                interestScore +
                                locationScore
                            ),
                            100
                        );


                    // -----------------------------
                    // MATCH REASONS
                    // -----------------------------

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


                    if (locationMatch) {

                        reason.push(
                            `Location matched: ${internship.location}`
                        );

                    }


                    return {

                        internship,

                        matchScore,

                        matchedSkills,

                        interestMatch,

                        locationMatch,

                        reason

                    };

                })


                .filter(
                    (item) =>
                        item.matchScore > 0
                )


                .sort(
                    (a, b) =>
                        b.matchScore -
                        a.matchScore
                );


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


export default router;