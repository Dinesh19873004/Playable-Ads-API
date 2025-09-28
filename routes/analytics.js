// routes/analytics.js
import express from "express";
import db from "../models/index.js";
import authMiddleware from "../middleware/auth.js";

const router=express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {projectId, eventType}=req.body;

        if (!projectId||!eventType) {
            return res.status(400).json({error: "projectId and eventType are required"});
        }

        // validate eventType
        if (!["play", "click", "impression"].includes(eventType)) {
            return res.status(400).json({error: "Invalid eventType"});
        }

        const event=await db.Analytics.create({projectId, eventType});

        res.status(201).json({message: "Event recorded", event});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;
