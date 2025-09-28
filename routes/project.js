// routes/project.js
import express from "express";
import db from "../models/index.js";  // ✅ import db
import authMiddleware from "../middleware/auth.js";

const router=express.Router();

// Destructure models
const {Project}=db;

// Create Project
router.post("/", authMiddleware, async (req, res) => {
    const {title, description}=req.body;
    console.log("Incoming project:", {title, description, userId: req.userId});

    try {
        const project=await Project.create({
            title,
            description,
            userId: req.userId,
        });
        res.json(project);
    } catch (err) {
        console.error("Project creation error:", err);
        res.status(500).json({error: err.message, details: err.errors||[]});
    }
});

// Get all projects of logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects=await Project.findAll({where: {userId: req.userId}});
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error fetching projects"});
    }
});

export default router;
