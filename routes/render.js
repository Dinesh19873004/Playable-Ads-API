import express from "express";
import path from "path";
import db from "../models/index.js";
import authMiddleware from "../middleware/auth.js";
import {renderQueue} from "../jobs/renderQueue.js";

const router=express.Router();

// Enqueue render job
router.post("/projects/:id/render", async (req, res) => {
    try {
        const {id}=req.params;

        const inputFile=req.body.inputFile; // e.g. from DB or request
        const outputFile=`outputs/${Date.now()}-rendered.mp4`;

        const job=await renderQueue.add("render", {
            projectId: id,
            inputFile,
            outputFile,
        });

        res.json({
            message: "Render job enqueued",
            jobId: job.id,   // 👈 return job id here
            inputFile,
            outputFile,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


export default router;
