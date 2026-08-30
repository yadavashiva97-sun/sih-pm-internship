import express from "express";
import mongoose from "mongoose";

import { Internship } from "../models/Internship.js";
import { Student } from "../models/Student.js";

const router = express.Router();

/* =====================================================
   HELPERS
===================================================== */

function normalize(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[._-]/g, " ")
        .replace(/\s+/g, " ");
}

function toArray(value) {
    if (Array.isArray(value)) {
        return value
            .map(item => String(item).trim())
            .filter(Boolean);
    }

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return [];
    }

    return String(value)
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);
}

/* =====================================================
   INTEREST GROUPS
===================================================== */

const interestGroups = {
    "web development": [
        "web development",
        "frontend development",
        "front end development",
        "backend development",
        "back end development",
        "full stack development",
        "fullstack development",
        "web developer",
        "frontend",
        "front end",
        "backend",
        "back end",
        "full stack",
        "fullstack"
    ],

    "software development": [
        "software development",
        "software engineering",
        "application development",
        "programming",
        "coding",
        "software developer"
    ],

    "data science": [
        "data science",
        "data analytics",
        "data analysis",
        "business analytics",
        "machine learning",
        "artificial intelligence",
        "ai",
        "ml"
    ],

    "artificial intelligence": [
        "artificial intelligence",
        "ai",
        "machine learning",
        "ml",
        "deep learning",
        "data science"
    ],

    "cyber security": [
        "cyber security",
        "cybersecurity",
        "information security",
        "network security"
    ],

    "app development": [
        "app development",
        "mobile development",
        "android development",
        "ios development",
        "mobile app development"
    ],

    "cloud computing": [
        "cloud computing",
        "cloud",
        "devops",
        "aws",
        "azure",
        "google cloud"
    ]
};

function interestsAreRelated(
    studentInterest,
    internshipInterest
) {
    const student = normalize(studentInterest);
    const internship = normalize(internshipInterest);

    if (!student || !internship) {
        return false;
    }

    if (student === internship) {
        return true;
    }

    for (const group of Object.values(interestGroups)) {
        const studentMatch = group.some(item => {
            const normalizedItem = normalize(item);

            return (
                student === normalizedItem ||
                student.includes(normalizedItem) ||
                normalizedItem.includes(student)
            );
        });

        const internshipMatch = group.some(item => {
            const normalizedItem = normalize(item);

            return (
                internship === normalizedItem ||
                internship.includes(normalizedItem) ||
                normalizedItem.includes(internship)
            );
        });

        if (studentMatch && internshipMatch) {
            return true;
        }
    }

    return (
        student.includes(internship) ||
        internship.includes(student)
    );
}

/* =====================================================
   SKILL ALIASES
===================================================== */

const skillAliases = {
    javascript: [
        "javascript",
        "js"
    ],

    typescript: [
        "typescript",
        "ts"
    ],

    react: [
        "react",
        "reactjs",
        "react js"
    ],

    nodejs: [
        "node",
        "nodejs",
        "node js"
    ],

    mongodb: [
        "mongodb",
        "mongo",
        "mongo db"
    ],

    html: [
        "html",
        "html5"
    ],

    css: [
        "css",
        "css3"
    ],

    python: [
        "python"
    ],

    java: [
        "java"
    ],

    github: [
        "github",
        "git hub"
    ]
};

function skillsAreRelated(
    studentSkill,
    internshipSkill
) {
    const student = normalize(studentSkill);
    const internship = normalize(internshipSkill);

    if (!student || !internship) {
        return false;
    }

    if (student === internship) {
        return true;
    }

    if (
        student.includes(internship) ||
        internship.includes(student)
    ) {
        return true;
    }

    for (const aliases of Object.values(skillAliases)) {
        const studentMatch = aliases.some(item => {
            const normalizedItem = normalize(item);

            return (
                student === normalizedItem ||
                student.includes(normalizedItem) ||
                normalizedItem.includes(student)
            );
        });

        const internshipMatch = aliases.some(item => {
            const normalizedItem = normalize(item);

            return (
                internship === normalizedItem ||
                internship.includes(normalizedItem) ||
                normalizedItem.includes(internship)
            );
        });

        if (studentMatch && internshipMatch) {
            return true;
        }
    }

    return false;
}

/* =====================================================
   EDUCATION
===================================================== */

function educationMatches(
    studentEducation,
    internshipEducation
) {
    const studentValues =
        toArray(studentEducation).map(normalize);

    const internshipValues =
        toArray(internshipEducation).map(normalize);

    if (internshipValues.length === 0) {
        return true;
    }

    if (
        internshipValues.some(
            value =>
                value === "any" ||
                value === "any degree" ||
                value === "all"
        )
    ) {
        return true;
    }

    if (studentValues.length === 0) {
        return false;
    }

    return studentValues.some(studentEdu =>
        internshipValues.some(internshipEdu =>
            studentEdu === internshipEdu ||
            studentEdu.includes(internshipEdu) ||
            internshipEdu.includes(studentEdu)
        )
    );
}

/* =====================================================
   LOCATION
===================================================== */

function locationMatches(
    studentLocation,
    internshipLocation
) {
    const student = normalize(studentLocation);
    const internship = normalize(internshipLocation);

    if (
        !student ||
        student === "any" ||
        student === "any location"
    ) {
        return true;
    }

    if (
        !internship ||
        internship === "remote" ||
        internship === "any" ||
        internship === "any location"
    ) {
        return true;
    }

    return (
        student === internship ||
        student.includes(internship) ||
        internship.includes(student)
    );
}

/* =====================================================
   MATCH CALCULATION
===================================================== */

function calculateMatch(student, internship) {
    const studentSkills =
        toArray(student.skills);

    const internshipSkills =
        toArray(internship.skills);

    const studentInterests =
        toArray(student.interests);

    const matchedSkills =
        internshipSkills.filter(
            internshipSkill =>
                studentSkills.some(studentSkill =>
                    skillsAreRelated(
                        studentSkill,
                        internshipSkill
                    )
                )
        );

    const skillScore =
        internshipSkills.length > 0
            ? (matchedSkills.length /
                internshipSkills.length) * 50
            : 0;

    const interestMatch =
        studentInterests.some(studentInterest =>
            interestsAreRelated(
                studentInterest,
                internship.interest
            )
        );

    const interestScore =
        interestMatch ? 20 : 0;

    const educationMatch =
        educationMatches(
            student.education || student.course,
            internship.education
        );

    const educationScore =
        educationMatch ? 15 : 0;

    const locationMatch =
        locationMatches(
            student.location,
            internship.location
        );

    const locationScore =
        locationMatch ? 15 : 0;

    const matchScore =
        Math.min(
            100,
            Math.round(
                skillScore +
                interestScore +
                educationScore +
                locationScore
            )
        );

    const skillGap =
        internshipSkills.filter(
            internshipSkill =>
                !studentSkills.some(studentSkill =>
                    skillsAreRelated(
                        studentSkill,
                        internshipSkill
                    )
                )
        );

    const reason = [];

    if (matchedSkills.length > 0) {
        reason.push(
            `Skills matched: ${matchedSkills.join(", ")}`
        );
    }

    if (interestMatch) {
        reason.push(
            `Interest matched: ${internship.interest || "Related interest"}`
        );
    }

    if (educationMatch) {
        reason.push(
            "Education eligibility matched"
        );
    }

    if (locationMatch) {
        reason.push(
            `Location matched: ${internship.location || "Remote"}`
        );
    }

    if (skillGap.length > 0) {
        reason.push(
            `Skills to improve: ${skillGap.join(", ")}`
        );
    }

    return {
        internship,
        matchScore,
        matchedSkills,
        skillGap,

        breakdown: {
            skills: Math.round(skillScore),
            interest: interestScore,
            education: educationScore,
            location: locationScore
        },

        interestMatch,
        educationMatch,
        locationMatch,
        reason
    };
}

/* =====================================================
   TEST
===================================================== */

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Internship API is working"
    });
});

/* =====================================================
   GET ALL
===================================================== */

router.get("/", async (req, res) => {
    try {
        const internships =
            await Internship.find({
                status: {
                    $in: [
                        "Active",
                        "Not specified"
                    ]
                }
            }).sort({
                createdAt: -1
            });

        res.json({
            success: true,
            count: internships.length,
            internships
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch internships",
            error: error.message
        });
    }
});

/* =====================================================
   SEARCH
===================================================== */

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
            await Internship.find(filter)
                .sort({
                    createdAt: -1
                });

        res.json({
            success: true,
            count: internships.length,
            internships
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                "Failed to search internships",
            error: error.message
        });
    }
});

/* =====================================================
   MATCH STUDENT
===================================================== */

router.get(
    "/match/:studentId",
    async (req, res) => {
        try {
            const { studentId } = req.params;

            if (
                !mongoose.Types.ObjectId.isValid(studentId)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid student ID"
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

            const internships =
                await Internship.find({
                    status: {
                        $in: [
                            "Active",
                            "Not specified"
                        ]
                    }
                });

            const recommendations =
                internships
                    .map(internship =>
                        calculateMatch(
                            student,
                            internship
                        )
                    )
                    .sort(
                        (a, b) =>
                            b.matchScore -
                            a.matchScore
                    );

            res.json({
                success: true,
                studentId: student._id,
                count: recommendations.length,
                recommendations
            });

        } catch (error) {
            console.error(
                "Matching error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to find matching internships",
                error: error.message
            });
        }
    }
);

/* =====================================================
   GET ONE
===================================================== */

router.get("/:id", async (req, res) => {
    try {
        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid internship ID"
            });
        }

        const internship =
            await Internship.findById(
                req.params.id
            );

        if (!internship) {
            return res.status(404).json({
                success: false,
                message:
                    "Internship not found"
            });
        }

        res.json({
            success: true,
            internship
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                "Failed to fetch internship",
            error: error.message
        });
    }
});

/* =====================================================
   CREATE
===================================================== */

router.post("/", async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            workMode,
            skills,
            interest,
            education,
            stipend,
            duration,
            eligibility,
            description,
            deadline,
            careerValue,
            competitionLevel,
            skillGap
        } = req.body;

        if (!title || !company || !location) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, company and location are required"
            });
        }

        const cleanSkills =
            toArray(skills);

        if (cleanSkills.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "At least one skill is required"
            });
        }

        const internship =
            await Internship.create({
                title: String(title).trim(),

                company:
                    String(company).trim(),

                location:
                    String(location).trim(),

                workMode:
                    workMode ||
                    "Not specified",

                skills: cleanSkills,

                interest:
                    interest ||
                    "General",

                education:
                    toArray(education),

                stipend:
                    stipend ||
                    "Not specified",

                duration:
                    duration ||
                    "Not specified",

                eligibility:
                    eligibility ||
                    "Not specified",

                description:
                    description ||
                    "No description available.",

                applicationUrl: "",

                source:
                    "PM Internship Assistant",

                deadline:
                    deadline ||
                    "Not specified",

                status: "Active",

                careerValue:
                    Number(careerValue) || 70,

                competitionLevel:
                    competitionLevel ||
                    "Medium",

                skillGap:
                    toArray(skillGap)
            });

        res.status(201).json({
            success: true,
            message:
                "Internship created successfully",
            internship
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to create internship",
            error: error.message
        });
    }
});

/* =====================================================
   UPDATE
===================================================== */

router.put("/:id", async (req, res) => {
    try {
        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid internship ID"
            });
        }

        const updates = {
            ...req.body
        };

        delete updates.applicationUrl;
        delete updates.source;

        if (updates.skills) {
            updates.skills =
                toArray(updates.skills);
        }

        if (updates.education) {
            updates.education =
                toArray(updates.education);
        }

        if (updates.skillGap) {
            updates.skillGap =
                toArray(updates.skillGap);
        }

        const internship =
            await Internship.findByIdAndUpdate(
                req.params.id,
                updates,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!internship) {
            return res.status(404).json({
                success: false,
                message:
                    "Internship not found"
            });
        }

        res.json({
            success: true,
            message:
                "Internship updated successfully",
            internship
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                "Failed to update internship",
            error: error.message
        });
    }
});

/* =====================================================
   DELETE
===================================================== */

router.delete("/:id", async (req, res) => {
    try {
        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid internship ID"
            });
        }

        const internship =
            await Internship.findByIdAndDelete(
                req.params.id
            );

        if (!internship) {
            return res.status(404).json({
                success: false,
                message:
                    "Internship not found"
            });
        }

        res.json({
            success: true,
            message:
                "Internship deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                "Failed to delete internship",
            error: error.message
        });
    }
});

export default router;