import express from "express";
import multer from "multer";
import db from "../models/index.js";
import authMiddleware from "../middleware/auth.js";
import path from "path";

const router=express.Router();

// storage config for uploads
const storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname));
    },
});

const upload=multer({storage});

// Upload an asset
router.post(
    "/projects/:id/assets",
    authMiddleware,
    upload.single("asset"),
    async (req, res) => {
        try {
            console.log(req.params.id)
            const project=await db.Project.findByPk(req.params.id);
            if (!project||project.userId!==req.userId) {
                return res.status(404).json({message: "Project not found or unauthorized"});
            }

            // Save file metadata (you could create Asset model, but keeping simple)
            const filePath=req.file.path;

            res.json({
                message: "Asset uploaded successfully",
                projectId: project.id,
                file: filePath,
            });
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
);

export default router;
