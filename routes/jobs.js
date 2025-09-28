// routes/jobs.js
import express from "express";
import {renderQueue} from "../jobs/renderQueue.js";

const router=express.Router();

// GET /jobs/:id → check job status
router.get("/:id", async (req, res) => {
    try {
        const job=await renderQueue.getJob(req.params.id);

        if (!job) {
            return res.status(404).json({error: "Job not found"});
        }

        const state=await job.getState(); // pending | active | completed | failed | delayed | waiting
        const progress=job.progress||0;
        const result=job.returnvalue||null;

        res.json({
            id: job.id,
            state,
            progress,
            result,
            failedReason: job.failedReason||null,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;
