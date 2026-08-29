import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "STUDENT ROUTE WORKING"
    });
});

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Students API working"
    });
});

export default router;