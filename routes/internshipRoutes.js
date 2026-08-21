import express from "express";
import { Internship } from "../models/Internship.js";
import { Student } from "../models/Student.js";

const router = express.Router();
console.log("Internship routes loading");



router.get("/search", async (req, res) => {
    try {
        const { interest, location, skill } = req.query;

        let filter = {};

        if (interest) {
            filter.interest = { $regex: interest, $options: "i" };
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (skill) {
            filter.skills = { $regex: skill, $options: "i" };
        }

        const internships = await Internship.find(filter);

        res.json(internships);
    } catch (error) {
        res.status(500).json({
            message: "Failed to search internships"
        });
    }
});



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

router.get("/match/:studentId", async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const internships = await Internship.find();

        const recommendations = internships
            .map((internship) => {

                const matchedSkills = internship.skills.filter((skill) =>
                    student.skills.some(
                        (studentSkill) => {
                            const studentSkillLower = studentSkill.toLowerCase();
                            const internshipSkillLower = skill.toLowerCase();

                            return (
                                studentSkillLower === internshipSkillLower ||
                                studentSkillLower.includes(internshipSkillLower) ||
                                internshipSkillLower.includes(studentSkillLower)
                            );
                        }
                    )
                );

                const interestMatch = student.interests.some(
                    (interest) =>
                        interest.toLowerCase() ===
                        internship.interest.toLowerCase()
                );

                const skillScore =
                    (matchedSkills.length / internship.skills.length) * 60;

                const interestScore = interestMatch ? 25 : 0;

                const locationMatch =
                    student.location.toLowerCase() === internship.location.toLowerCase();

                const locationScore = locationMatch ? 15 : 0;

                const matchScore = Math.round(
                    skillScore + interestScore + locationScore
                );
                const reason = [];

                if (matchedSkills.length > 0) {
                    reason.push(`Skills matched: ${matchedSkills.join(", ")}`);
                }

                if (interestMatch) {
                    reason.push(`Interest matched: ${internship.interest}`);
                }
                if (locationMatch) {
                    reason.push(`Location matched: ${internship.location}`);
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
            .filter((item) => item.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);

        res.json(recommendations);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to find matching internships"
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